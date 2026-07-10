"use client";

import { Article } from "@/@types/article";
import { removeMarkdown } from "@/lib/utils";

interface ArticleItemProps {
  data: Article;
  index?: number;
}

export default function ArticleItem({ data, index = 0 }: ArticleItemProps) {
  const image = data.HeadImg || data.image;
  const excerpt = removeMarkdown(data.content).replace(/\s+/g, " ").trim().slice(0, 100);
  const date = data.createdAt.slice(0, 10);
  const issueNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="magazine-entry">
      <div className="magazine-entry__rail">
        <span className="magazine-entry__index" aria-hidden="true">
          {issueNumber}
        </span>
        <time className="magazine-entry__date" dateTime={date}>
          {date}
        </time>
      </div>

      <div className="magazine-entry__body">
        <h2 className="magazine-entry__title">{data.title}</h2>

        {excerpt && <p className="magazine-entry__excerpt">{excerpt}…</p>}

        {data.tags.length > 0 && (
          <div className="magazine-entry__tag-row" aria-label="标签">
            {data.tags.map((tag) => (
              <span key={tag.id} className="tag-chip">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {image ? (
        <div className="magazine-entry__media">
          <div className="thumb magazine-entry__thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" loading="lazy" />
          </div>
        </div>
      ) : (
        <div className="magazine-entry__media magazine-entry__media--empty" aria-hidden="true" />
      )}
    </article>
  );
}
