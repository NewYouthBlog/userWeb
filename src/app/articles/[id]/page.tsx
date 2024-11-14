import { article } from "@/@types/arctice";
import { resData } from "@/@types/response";
import MarkdownRenderer from "@/components/MarkDownRender/MarkDownRender";
import request from "@/lib/request";
import { Container } from "@mui/material";
import { AxiosResponse } from "axios";

interface props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ({ params }: props) {
  const { id } = await params;
  const res: AxiosResponse<resData<article>> = await request.get(
    `/articles/${id}`,
  );
  console.log(res.data);

  return (
    <Container sx={{ mt: 8 }}>
      <MarkdownRenderer content={res.data.data.content}></MarkdownRenderer>
    </Container>
  );
}
