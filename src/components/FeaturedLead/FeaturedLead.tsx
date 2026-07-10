import { Article } from "@/@types/article";
import { resData } from "@/@types/response";
import request from "@/lib/request";
import { removeMarkdown } from "@/lib/utils";
import { AxiosResponse } from "axios";
import Link from "next/link";

async function getLatestArticle(): Promise<Article | null> {
  try {
    const res: AxiosResponse<resData<Article[], "articles">> = await request.get(
      "/articles?page=1&limit=1&status=1",
    );
    return res.data.data.articles[0] ?? null;
  } catch {
    return null;
  }
}

export default async function FeaturedLead() {
  const article = await getLatestArticle();

  if (!article) {
    return null;
  }

  const cover = article.HeadImg || article.image || "";
  const date = article.createdAt.slice(0, 10);
  const excerpt = removeMarkdown(article.content).replace(/\s+/g, " ").trim().slice(0, 96);

  return (
    <Link
      href={`/articles/${article.id}`}
      className="masthead-lead entry-link"
      aria-label={`本期首篇：${article.title}`}
    >
      {cover ? (
        <div className="thumb masthead-lead__cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="" />
        </div>
      ) : (
        <div className="masthead-lead__cover masthead-lead__cover--placeholder" aria-hidden="true">
          <span className="masthead-lead__mark" />
        </div>
      )}

      <div className="masthead-lead__body">
        <div className="masthead-lead__meta">
          <span className="masthead-lead__label">本期首篇</span>
          <time dateTime={date}>{date}</time>
        </div>
        <h2 className="masthead-lead__title">{article.title}</h2>
        {excerpt && <p className="masthead-lead__excerpt">{excerpt}…</p>}
        <span className="text-button masthead-lead__cta">
          阅读
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
