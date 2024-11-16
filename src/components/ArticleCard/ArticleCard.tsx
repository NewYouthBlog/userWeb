import { article } from "@/@types/arctice";
import { resData } from "@/@types/response";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import Arctices from "./Arctices.client";

export default async function ArtcileCard() {
  const res: AxiosResponse<resData<article[], "articles">> = await request.get(
    `/articles?page=1&limit=10&status=1`,
  );
  const data = {
    articles: res.data.data.articles,
    total: res.data.data.total,
  };

  return <Arctices data={data}></Arctices>;
}
