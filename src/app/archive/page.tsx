import React from "react";
import { Timeline } from "@/components/ui/timeline";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import { Archive } from "@/@types/archive";
import { resData } from "@/@types/response";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
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

  const data = archiveItems.map((value) => {
    return {
      title: `${value.year}.${value.month}`,
      content: (
        <div key={`${value.year}-${value.month}`}>
          <div className="archive-article-grid">
            {value.articles.map((item) => {
              const image = item.HeadImg || item.image;

              return (
                <Link
                  key={item.id}
                  href={`/articles/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box
                    className="archive-article-card"
                    sx={{
                      minHeight: { xs: 160, md: 220 },
                    }}
                  >
                    {image ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt={item.title}
                          className="archive-article-image"
                        />
                        <span className="archive-image-shade" />
                      </>
                    ) : (
                      <span className="archive-map-placeholder" />
                    )}

                    <Typography
                      component="h2"
                      className="archive-article-title"
                      sx={{
                        fontSize: { xs: 17, md: 21 },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography component="span" className="archive-article-meta">
                      {item.createdAt?.slice(0, 10) || `${value.year}.${value.month}`}
                    </Typography>
                  </Box>
                </Link>
              );
            })}
          </div>
        </div>
      ),
    };
  });
  return (
    <div className="w-full">
      {data.length > 0 ? (
        <Timeline data={data} />
      ) : (
        <Typography sx={{ mt: 12, textAlign: "center" }}>
          暂无归档内容
        </Typography>
      )}
    </div>
  );
}
