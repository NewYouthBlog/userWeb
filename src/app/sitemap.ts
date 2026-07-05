import { MetadataRoute } from "next";
import request from "@/lib/request";
import { Article } from "@/@types/article";
import { Tag } from "@/@types/tag";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

function sitemapEntry(
    path: string,
    lastModified: Date,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number,
): MetadataRoute.Sitemap[number] {
    return {
        url: absoluteUrl(path),
        lastModified,
        changeFrequency,
        priority,
    };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes = [
        "",
        "/archive",
    ].map((route) => sitemapEntry(route, new Date(), "daily", 1));

    try {
        const articleRes = await request.get<{ data: { articles: Article[] } }>("/articles?page=1&limit=1000");
        const articles = articleRes.data.data.articles.map((item) => ({
            url: absoluteUrl(`/articles/${item.id}`),
            lastModified: new Date(item.updatedAt || item.createdAt),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));

        const tagRes = await request.get<{ data: Tag[] }>("/tags");
        const tags = tagRes.data.data.map((tag) => ({
            url: absoluteUrl(`/tags/${encodeURIComponent(tag.name)}`),
            lastModified: new Date(tag.updatedAt || tag.createdAt),
            changeFrequency: "weekly" as const,
            priority: 0.5,
        }));

        return [...routes, ...articles, ...tags];
    } catch (error) {
        console.error("Failed to generate sitemap:", error);
        return [...routes];
    }
}
