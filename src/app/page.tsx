import ArticleCard from "@/components/ArticleCard/ArticleCard";
import TagsCard from "@/components/TagsCard/TagsCard";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import Link from "next/link";

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
    <div className="page-shell motion-fade-in">
      <script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="kicker motion-fade-up delay-100">New Youth Talks</span>
          <h1 className="hero-title motion-fade-up delay-200">
            在数字荒原里，
            <br />
            构建你的庇护所。
          </h1>
          <p className="hero-lead motion-fade-up delay-300">
            这里收拢技术、生活和长期主义的笔记。不是追逐下一阵噪声，而是在复杂系统里，为自己搭建一处能思考、能创造、能继续出发的地方。
          </p>
          <div className="hero-actions motion-fade-up delay-400">
            <Link className="action-button" href="#latest-articles">
              阅读最新文章
            </Link>
            <Link className="action-button secondary" href="/archive">
              查看时间线
            </Link>
          </div>
        </div>

        <aside className="hero-figure" aria-hidden="true">
          <div className="hero-grid-ornament" />
          <div className="hero-marker hero-marker--a" />
          <div className="hero-marker hero-marker--b" />
          <div className="hero-marker hero-marker--c" />
        </aside>
      </section>

      {/* Latest articles */}
      <section id="latest-articles" className="home-content">
        <header className="home-section-header">
          <h2 className="section-heading">最新补给</h2>
          <p className="section-lead">
            最近写下的技术实践、思考切片和构建记录。每篇文章都应该帮你把一个问题看清楚一点。
          </p>
        </header>

        <div className="home-layout">
          <div className="home-main">
            <ArticleCard urlPrefix="articles" />
          </div>
          <aside className="home-sidebar">
            <TagsCard />
          </aside>
        </div>
      </section>
    </div>
  );
}
