import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{
    tagname: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tagname } = await params;
  const decodedTag = decodeURIComponent(tagname);
  const canonical = `/tags/${encodeURIComponent(decodedTag)}`;

  return {
    title: `标签: ${decodedTag}`,
    description: `查看所有关于 ${decodedTag} 的文章`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `标签: ${decodedTag}`,
      description: `查看所有关于 ${decodedTag} 的文章`,
      url: absoluteUrl(canonical),
      type: "website",
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tagname } = await params;
  const decodedTag = decodeURIComponent(tagname);

  return (
    <div className="page-shell tag-page">
      <header className="tag-page__header">
        <span className="kicker">Tag</span>
        <h1 className="section-heading">{decodedTag}</h1>
        <p className="section-lead tag-page__lead">
          所有与 “{decodedTag}” 相关的文章索引。
        </p>
      </header>

      <ArticleCard urlPrefix={tagname} />
    </div>
  );
}
