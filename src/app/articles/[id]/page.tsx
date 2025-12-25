import { article } from "@/@types/arctice";
import { resData } from "@/@types/response";
import MarkdownRenderer from "@/components/MarkDownRender/MarkDownRender";
import request from "@/lib/request";
import { Container } from "@mui/material";
import { AxiosResponse } from "axios";

import { Metadata, ResolvingMetadata } from "next";

interface props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  // fetch data
  try {
    const res: AxiosResponse<resData<article>> = await request.get(
      `/articles/${id}`,
    );
    const articleData = res.data.data;

    return {
      title: articleData.title,
      description: articleData.content.slice(0, 160) + "...",
      openGraph: {
        title: articleData.title,
        description: articleData.content.slice(0, 160) + "...",
        images: [
          articleData.image ||
            articleData.HeadImg ||
            "/images/default-cover.jpg",
        ],
      },
    };
  } catch (error) {
    return {
      title: "Article Not Found",
    };
  }
}

export default async function ({ params }: props) {
  const { id } = await params;
  const res: AxiosResponse<resData<article>> = await request.get(
    `/articles/${id}`,
  );
  return (
    <Container sx={{ mt: 8 }}>
      <MarkdownRenderer content={res.data.data.content}></MarkdownRenderer>
    </Container>
  );
}
