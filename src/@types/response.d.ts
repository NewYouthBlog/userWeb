import { article } from "./arctice";

// 以下内容全文背诵！！
export type resData<T, K extends string = "default"> = {
  data: K extends "default"
    ? T
    : {
        [P in K]: T extends any[] ? T : T;
      } & {
        total: number;
      };
  code: number;
  message: string;
};
