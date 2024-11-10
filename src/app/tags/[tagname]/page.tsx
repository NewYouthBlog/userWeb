import ArcticCard from "@/components/ArticleCard/ArcticeCard";
import PageHeader from "@/components/common/PageHeader";
import TypingAnimation from "@/components/ui/typing-animation";
import { Container } from "@mui/material";

interface props {
  params: Promise<{
    tagname: string;
  }>;
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
        {/* FIX: 此处应改成直接传url  */}
        <ArcticCard></ArcticCard>
      </Container>
    </>
  );
}
