import { Tag } from "./tag";

export type Article = {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  HeadImg?: string;
};
