// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@element-plus/nuxt"],
	app: {
		head: {
			charset: "utf-8",
			title: "星河的博客",
			meta: [
				// <meta name="description" content="My amazing site">
				{ name: "description", content: "一个极简的博客" },
				{ name: "keywords", content: "博客,前端,后端,技术,go,gin,python,vue,glong" },
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
		},
	},
});
