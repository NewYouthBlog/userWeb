import { article } from "@/@types/arctice";
import CardfoPC from "./CardforPC";
import CardforMobile from "./CardforMobile";
import { Box } from "@mui/material";
import Link from "next/link";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import { resData } from "@/@types/response";

export default async function ArcticCard() {
  const res: AxiosResponse<resData<article[], "articles">> = await request.get(
    "/articles?page=1&limit=10&status=1",
  );

  const listArticle = res.data.data.articles.map((item, index) => {
    return (
      <Link key={index} href={`/articles/${item.id}`} legacyBehavior>
        <a target="_blank">
          <Box sx={{ mt: 4 }} key={index}>
            <CardfoPC key={`${index}-pc`} data={item}></CardfoPC>
            <CardforMobile key={`${index}-mob`} data={item}></CardforMobile>
          </Box>
        </a>
      </Link>
    );
  });
  return <>{listArticle}</>;
}
