import { Article } from "./article";

export type Archive = {
  year: number;
  month: number;
  articles: Omit<Article, "tags">[];
};
