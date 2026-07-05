import ArcticCard from "@/components/ArticleCard/ArticleCard";
import PageHeader from "@/components/common/PageHeader";
import TypingAnimation from "@/components/ui/typing-animation";
import { Container } from "@mui/material";

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
  return (
    <>
      <PageHeader>
        <TypingAnimation
          text={decodeURIComponent(tagname)}
          className="text-5xl font-bold text-white"
        />
      </PageHeader>
      <Container>
        <ArcticCard urlPrefix={tagname} />
      </Container>
    </>
  );
}
