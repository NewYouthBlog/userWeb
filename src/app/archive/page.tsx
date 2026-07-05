import React from "react";
import { Timeline } from "@/components/ui/timeline";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import { Archive } from "@/@types/archive";
import { resData } from "@/@types/response";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "文章归档",
  description: "按时间线浏览新青年talks的技术文章、生活观察和项目记录",
  alternates: {
    canonical: "/archive",
  },
  openGraph: {
    title: "文章归档",
    description: "按时间线浏览新青年talks的技术文章、生活观察和项目记录",
    url: absoluteUrl("/archive"),
    type: "website",
  },
};

export default async function ArchivePage() {
  let archiveItems: Archive[] = [];

  try {
    const res: AxiosResponse<resData<Archive[]>> = await request.get("/archive");
    archiveItems = res.data.data;
  } catch {
    archiveItems = [];
  }

  const data = archiveItems.map((value) => ({
    title: `${value.year}.${String(value.month).padStart(2, "0")}`,
    content: (
      <div className="archive-grid">
        {value.articles.map((item) => {
          const image = item.HeadImg || item.image;
          const date = item.createdAt?.slice(0, 10) || `${value.year}.${value.month}`;

          return (
            <Link
              key={item.id}
              href={`/articles/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="entry-link"
            >
              <article className="archive-card">
                <div className="thumb archive-card__thumb">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={item.title} loading="lazy" />
                  ) : (
                    <div className="archive-card__placeholder" aria-hidden="true">
                      <span />
                    </div>
                  )}
                </div>
                <div className="archive-card__body">
                  <time dateTime={date} className="archive-card__date">
                    {date}
                  </time>
                  <h3 className="archive-card__title">{item.title}</h3>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    ),
  }));

  return (
    <div className="w-full">
      {data.length > 0 ? (
        <Timeline data={data} />
      ) : (
        <p className="text-center mt-24 text-[var(--muted)]">暂无归档内容</p>
      )}
    </div>
  );
}
