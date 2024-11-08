import { TagsCard_client } from "./TagsCard-client";

//FIX: use database
const tags = [
  { id: 1, name: "golang" },
  { id: 2, name: "python" },
  { id: 3, name: "lua" },
  { id: 4, name: "typescript" },
];

export default function TagsCard() {
  return <TagsCard_client data={tags}></TagsCard_client>;
}
