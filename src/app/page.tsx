import ArticleCard from "@/components/ArticleCard/ArticleCard";
import TagsCard from "@/components/TagsCard/TagsCard";
import { Box, Grid2, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: "zh-CN",
    publisher: {
      "@type": "Person",
      name: SITE_AUTHOR,
    },
  };

  return (
    <Box className="shelter-shell">
      <script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <section className="home-hero">
        <div className="hero-grid">
          <div>
            <span className="hero-kicker">New Youth Talks</span>
            <h1 className="hero-title">在数字荒原里，构建你的庇护所</h1>
            <p className="hero-copy">
              这里收拢技术、生活和长期主义的笔记。不是追逐下一阵噪声，而是在复杂系统里，为自己搭建一处能思考、能创造、能继续出发的地方。
            </p>
            <div className="hero-actions">
              <Link className="shelter-button" href="#latest-articles">
                阅读最新文章
              </Link>
              <Link className="shelter-button secondary" href="/archive">
                查看时间线
              </Link>
            </div>
          </div>

          <aside className="shelter-panel" aria-label="数字庇护所视觉地图">
            <span className="panel-label">Shelter Map / 2026</span>
            <div className="panel-logo-orbit">
              <Image
                src="/logo.png"
                alt="新青年talks logo"
                width={220}
                height={220}
                priority
              />
            </div>
            <div className="panel-note">
              <strong>边界不是逃离，是为了重新获得注意力。</strong>
              <span>
                技术文章是地基，生活观察是火光，项目实践是向外延伸的路线。
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section id="latest-articles" className="home-content">
        <Typography component="h2" className="section-heading">
          最新补给
        </Typography>
        <Typography component="p" className="section-subtitle">
          最近写下的技术实践、思考切片和构建记录。每篇文章都应该帮你把一个问题看清楚一点。
        </Typography>
        <Grid2 container justifyContent={"center"} columns={24} spacing={{ xs: 0, md: 4 }}>
          <Grid2 size={{ xs: 24, sm: 22, md: 15, lg: 16 }}>
              <ArticleCard urlPrefix="articles" />
            </Grid2>
            <Grid2
            size={{ xs: 0, md: 7, lg: 6 }}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <TagsCard />
            </Grid2>
          </Grid2>
      </section>
    </Box>
  );
}
