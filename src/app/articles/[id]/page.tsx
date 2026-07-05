import { Article } from "@/@types/article";
import { resData } from "@/@types/response";
import MarkdownRenderer from "@/components/MarkDownRender/MarkDownRender";
import request from "@/lib/request";
import { Box, Container, Typography } from "@mui/material";
import { AxiosResponse } from "axios";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_AUTHOR,
  SITE_NAME,
  absoluteUrl,
  summarizeMarkdown,
} from "@/lib/seo";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: ArticlePageProps,
): Promise<Metadata> {
  const { id } = await params;

  try {
    const res: AxiosResponse<resData<Article>> = await request.get(
      `/articles/${id}`,
    );
    const articleData = res.data.data;
    const description = summarizeMarkdown(articleData.content);
    const canonical = `/articles/${id}`;
    const image = articleData.image || articleData.HeadImg;

    return {
      title: articleData.title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title: articleData.title,
        description,
        url: absoluteUrl(canonical),
        type: "article",
        publishedTime: articleData.createdAt,
        modifiedTime: articleData.updatedAt || articleData.createdAt,
        authors: [SITE_AUTHOR],
        images: [
          image ? absoluteUrl(image) : absoluteUrl("/images/default-cover.jpg"),
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: articleData.title,
        description,
        images: [
          image ? absoluteUrl(image) : absoluteUrl("/images/default-cover.jpg"),
        ],
      },
    };
  } catch {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  let res: AxiosResponse<resData<Article>>;

  try {
    res = await request.get(`/articles/${id}`);
  } catch {
    notFound();
  }
  const article = res.data.data;
  const canonical = `/articles/${id}`;
  const image = article.image || article.HeadImg;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: summarizeMarkdown(article.content),
    image: image ? [absoluteUrl(image)] : undefined,
    datePublished: article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(canonical),
    },
    keywords: article.tags?.map((tag) => tag.name).join(", "),
    inLanguage: "zh-CN",
  };

  return (
    <Container maxWidth={false} sx={{ pt: 12, px: { xs: 2, md: 4 } }}>
      <script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Box component="article" className="article-reading-shell">
        <Box className="article-reading-header">
          <Typography component="p" className="article-reading-kicker">
            Field Note / {article.createdAt?.slice(0, 10)}
          </Typography>
          <Typography component="h1" className="article-reading-title">
            {article.title}
          </Typography>
          {article.tags?.length > 0 && (
            <Box className="article-reading-tags">
              {article.tags.map((tag) => (
                <span key={tag.id} className="shelter-tag">
                  {tag.name}
                </span>
              ))}
            </Box>
          )}
          {image && (
            <Box className="article-reading-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={article.title} />
            </Box>
          )}
        </Box>
        <MarkdownRenderer content={article.content} />
      </Box>
    </Container>
  );
}
