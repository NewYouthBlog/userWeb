import { useFetch } from "nuxt/app";
export interface Res<T> {
	code: number;
	data: articlesData<T> | T;
	msg: string;
}
export interface articlesData<T> {
	articles: T;
	current_page_size: number;
	limit: number;
	page: number;
	total: number;
}

export const request = async <K>(path: string) => {
	return await useFetch<Res<K>>(`http://admin.xinqingnian.icu/api${path}`);
};
