"use client";
import { Article } from "@/@types/article";
import CardForPC from "./CardForPC";
import CardForMobile from "./CardForMobile";
import { Box, Pagination, Typography } from "@mui/material";
import Link from "next/link";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import { resData } from "@/@types/response";
import { useEffect, useState } from "react";

interface ArticlesProps {
  data: {
    articles: Article[];
    total: number;
  };
  urlPrefix: string;
}

export default function Articles({ data, urlPrefix }: ArticlesProps) {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>(data.articles);
  const [total] = useState(data.total);
  const [error, setError] = useState("");
  const urlprefix =
    urlPrefix === "articles" ? "/articles" : `/articles/tags/${urlPrefix}`;

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        setError("");
        const res: AxiosResponse<resData<Article[], "articles">> =
          await request.get(`${urlprefix}?page=${page}&limit=10&status=1`);
        if (!ignore) {
          setArticles(res.data.data.articles);
        }
      } catch {
        if (!ignore) {
          setError("文章加载失败，请稍后再试");
        }
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [page, urlprefix]);

  const listArticle = articles.map((item) => {
    return (
      <Link
        key={item.id}
        href={`/articles/${item.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >

        <Box component="article" sx={{ mt: { xs: 2.2, md: 2.6 } }}>
          <CardForPC data={item} />
          <CardForMobile data={item} />
        </Box>

      </Link>
    );
  });
  return (
    <>
      {error && (
        <Typography sx={{ mt: 4, textAlign: "center" }} color="error">
          {error}
        </Typography>
      )}
      {!error && articles.length === 0 && (
        <Typography sx={{ mt: 4, textAlign: "center" }}>
          暂无文章
        </Typography>
      )}
      {listArticle}
      {total < 10 ? (
        ""
      ) : (
        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "flex-end",
            "& .MuiPaginationItem-root": {
              borderRadius: 999,
              color: "var(--muted)",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "var(--ink)",
              color: "var(--canvas)",
            },
          }}
        >
          <Pagination
            onChange={(event, value) => {
              setPage(value);
              window.scrollTo(0, 0);
            }}
            count={Math.ceil(total / 10)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
}
