import { Article } from "@/@types/article";
import { resData } from "@/@types/response";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import Articles from "./Articles.client";

interface ArticleCardProps {
  urlPrefix: string;
}

export default async function ArticleCard({ urlPrefix }: ArticleCardProps) {
  const url =
    urlPrefix === "articles"
      ? "/articles?page=1&limit=10&status=1"
      : `/articles/tags/${urlPrefix}?page=1&limit=10&status=1`;
  let res: AxiosResponse<resData<Article[], "articles">>;

  try {
    res = await request.get(url);
  } catch {
    return <Articles data={{ articles: [], total: 0 }} urlPrefix={urlPrefix} />;
  }

  const data = {
    articles: res.data.data.articles,
    total: res.data.data.total,
  };

  return <Articles data={data} urlPrefix={urlPrefix} />;
}
