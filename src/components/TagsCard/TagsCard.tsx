import request from "@/lib/request";
import { TagsCard_client } from "./TagsCard-client";
import { AxiosResponse } from "axios";
import { Tag } from "@/@types/tag";

export default async function TagsCard() {
  let tags: Tag[] = [];

  try {
    const res: AxiosResponse<{ data: Tag[] }> = await request.get("/tags");
    tags = res.data.data;
  } catch {
    tags = [];
  }

  return <TagsCard_client data={tags} />;
}
