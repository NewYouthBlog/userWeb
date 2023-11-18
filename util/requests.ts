import { useFetch } from "nuxt/app";
export interface Res<T> {
	code: number;
	data: articlesData<T> | T;
	message: string;
}
export interface articlesData<T> {
	articles: T;
	limit: number;
	page: number;
	total: number;
}

export const request = async <K>(path: string) => {
	return await useFetch<Res<K>>(`http://127.0.0.1:3001${path}`);
};
