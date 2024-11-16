import request from "@/lib/request";
import { TagsCard_client } from "./TagsCard-client";
import { AxiosResponse } from "axios";
import { tags } from "@/@types/tag";

export default async function TagsCard() {
  const res: AxiosResponse<{ data: tags[] }> = await request.get("/tags");
  return <TagsCard_client data={res.data.data}></TagsCard_client>;
}
