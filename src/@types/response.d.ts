import { article } from "./arctice";

export type resData<T> = {
  data: {
    articles: T[];
    total: number;
  };
  code: number;
  message: string;
};
