import { tags } from "./tag";

export type article = {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  tags: tags[];
  HeadImg?: string;
  createdAt: string;
  updatedAt: string;
};
