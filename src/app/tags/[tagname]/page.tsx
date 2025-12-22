import ArcticCard from "@/components/ArticleCard/ArticleCard";
import PageHeader from "@/components/common/PageHeader";
import TypingAnimation from "@/components/ui/typing-animation";
import { Container } from "@mui/material";

import { Metadata } from "next";

interface props {
  params: Promise<{
    tagname: string;
  }>;
}

export async function generateMetadata(
  { params }: props
): Promise<Metadata> {
  const { tagname } = await params;
  const decodedTag = decodeURIComponent(tagname);
  return {
    title: `标签: ${decodedTag}`,
    description: `查看所有关于 ${decodedTag} 的文章`,
    openGraph: {
      title: `标签: ${decodedTag}`,
      description: `查看所有关于 ${decodedTag} 的文章`,
    },
  };
}

export default async function ({ params }: props) {
  const { tagname } = await params;
  return (
    <>
      <PageHeader>
        <TypingAnimation
          text={tagname}
          className="text-5xl font-bold text-white"
        ></TypingAnimation>
      </PageHeader>
      <Container>
        <ArcticCard urlPrefix={tagname}></ArcticCard>
      </Container>
    </>
  );
}
