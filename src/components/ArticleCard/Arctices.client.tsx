"use client";
import { article } from "@/@types/arctice";
import CardfoPC from "./CardforPC";
import CardforMobile from "./CardforMobile";
import { Box, Pagination } from "@mui/material";
import Link from "next/link";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import { resData } from "@/@types/response";
import { useEffect, useState } from "react";

interface props {
  data: {
    articles: article[];
    total: number;
  };
  urlPrefix: string;
}

export default function Arctices({ data, urlPrefix }: props) {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<article[]>(data.articles);
  const [total] = useState(data.total);
  const urlprefix =
    urlPrefix === "articles" ? "/articles" : `/articles/tags/${urlPrefix}`;

  useEffect(() => {
    async function fetchData() {
      const res: AxiosResponse<resData<article[], "articles">> =
        await request.get(`${urlprefix}?page=${page}&limit=10&status=1`);
      setArticles(res.data.data.articles);
    }
    fetchData();
  }, [page]);

  const listArticle = articles.map((item, index) => {
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
  return (
    <>
      {listArticle}
      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          onChange={(event, value) => {
            setPage(value);
            window.scrollTo(0, 0);
          }}
          count={Math.ceil(total / 10)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#538bb5", // 选中状态颜色
              color: "white", // 选中文字颜色
            },
          }}
        />
      </Box>
    </>
  );
}
