import { article } from "@/@types/arctice";
import { resData } from "@/@types/response";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import Arctices from "./Arctices.client";

interface dataUrl {
  urlPrefix: string;
}

export default async function ArtcileCard({ urlPrefix }: dataUrl) {
  const url =
    urlPrefix === "articles"
      ? "/articles?page=1&limit=10&status=1"
      : `/articles/tags/${urlPrefix}?page=1&limit=10&status=1`;
  const res: AxiosResponse<resData<article[], "articles">> =
    await request.get(url);
  console.log(url);
  const data = {
    articles: res.data.data.articles,
    total: res.data.data.total,
  };

  return <Arctices data={data} urlPrefix={urlPrefix}></Arctices>;
}
