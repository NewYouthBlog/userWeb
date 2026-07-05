"use client";

import { Article } from "@/@types/article";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { removeMarkdown } from "@/lib/utils";

interface ArticleItemProps {
  data: Article;
  index?: number;
}

export default function ArticleItem({ data, index = 0 }: ArticleItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: "80px 0px",
  });

  const image = data.HeadImg || data.image;
  const excerpt = removeMarkdown(data.content).slice(0, 110);
  const date = data.createdAt.slice(0, 10);
  const issueNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="magazine-entry"
    >
      <span className="magazine-entry__index" aria-hidden="true">
        {issueNumber}
      </span>

      {image && (
        <div className="magazine-entry__media">
          <div className="thumb magazine-entry__thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={data.title} loading="lazy" />
          </div>
        </div>
      )}

      <div className="magazine-entry__body">
        <div className="magazine-entry__meta">
          <time dateTime={date}>{date}</time>
          {data.tags.length > 0 && (
            <span className="magazine-entry__tag-row" aria-label="标签">
              {data.tags.map((tag) => (
                <span key={tag.id} className="tag-chip">
                  {tag.name}
                </span>
              ))}
            </span>
          )}
        </div>

        <h2 className="magazine-entry__title">{data.title}</h2>

        <p className="magazine-entry__excerpt">{excerpt}…</p>

        <span className="text-button magazine-entry__cta">
          阅读全文
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}
