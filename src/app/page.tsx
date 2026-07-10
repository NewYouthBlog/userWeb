import ArticleCard from "@/components/ArticleCard/ArticleCard";
import FeaturedLead from "@/components/FeaturedLead/FeaturedLead";
import TagsCard from "@/components/TagsCard/TagsCard";
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
    <div className="page-shell motion-fade-in">
      <script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <header className="masthead">
        <div className="masthead__intro">
          <span className="kicker">New Youth Talks</span>
          <h1 className="masthead__title">
            在数字荒原里，
            <br />
            构建你的庇护所。
          </h1>
          <p className="masthead__lead">
            技术、生活与长期主义的笔记。收拢噪声，留下能继续构建的文字。
          </p>
        </div>

        <FeaturedLead />
      </header>

      <section id="latest-articles" className="home-content" aria-label="最新文章">
        <div className="home-layout">
          <div className="home-main">
            <ArticleCard urlPrefix="articles" />
          </div>
          <aside className="home-sidebar" aria-label="主题索引">
            <TagsCard />
          </aside>
        </div>
      </section>
    </div>
  );
}
