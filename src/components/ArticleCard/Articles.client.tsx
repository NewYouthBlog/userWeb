"use client";

import { Article } from "@/@types/article";
import { resData } from "@/@types/response";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleItem from "./ArticleItem";

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
  const [loading, setLoading] = useState(false);

  const apiPath =
    urlPrefix === "articles" ? "/articles" : `/articles/tags/${urlPrefix}`;

  useEffect(() => {
    // Page 1 always comes from the server — never re-fetch (Strict Mode safe)
    if (page === 1) {
      setArticles(data.articles);
      setError("");
      setLoading(false);
      return;
    }

    let ignore = false;

    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const res: AxiosResponse<resData<Article[], "articles">> =
          await request.get(`${apiPath}?page=${page}&limit=10&status=1`);

        if (!ignore) {
          setArticles(res.data.data.articles);
        }
      } catch {
        if (!ignore) {
          setError("文章加载失败，请稍后再试");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [page, apiPath, data.articles]);

  const totalPages = Math.ceil(total / 10);

  return (
    <>
      {error && (
        <p className="magazine-list__status magazine-list__status--error" role="alert">
          {error}
        </p>
      )}

      {!error && articles.length === 0 && !loading && (
        <p className="magazine-list__status">暂无文章</p>
      )}

      <div className="magazine-list-shell" aria-busy={loading}>
        {loading && (
          <div className="magazine-list__progress" role="status" aria-live="polite">
            <span className="magazine-list__progress-bar" />
            <span className="sr-only">正在加载文章</span>
          </div>
        )}

        <div className="magazine-list">
          {articles.map((item, index) => (
            <Link
              key={item.id}
              href={`/articles/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="entry-link"
            >
              <ArticleItem data={item} index={index + (page - 1) * 10} />
            </Link>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <nav className="pagination" aria-label="文章分页">
          <button
            type="button"
            className="pagination__button"
            disabled={page <= 1 || loading}
            onClick={() => {
              setPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="上一页"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            上一页
          </button>

          <span className="pagination__info" aria-live="polite">
            {loading ? "加载中…" : `第 ${page} / ${totalPages} 页`}
          </span>

          <button
            type="button"
            className="pagination__button"
            disabled={page >= totalPages || loading}
            onClick={() => {
              setPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="下一页"
          >
            下一页
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      )}
    </>
  );
}
