import { article } from "./arctice";

export type archIve = {
  year: number;
  month: number;
  articles: Omit<article, "tags">[];
};
