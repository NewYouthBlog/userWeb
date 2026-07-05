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
