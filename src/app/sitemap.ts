import { MetadataRoute } from "next";
import request from "@/lib/request";
import { article } from "@/@types/arctice";

// Helper to get base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes
    const routes = [
        "",
        "/archive",
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
    }));

    try {
        // Dynamic routes: Articles
        const articleRes = await request.get<{ data: { articles: article[] } }>("/articles?page=1&limit=1000"); // Fetch all/many for sitemap
        // Note: Adjust limit based on actual total count or implement pagination loop if needed.
        // Assuming 1000 is enough for now or this endpoint returns all.
        // If not, we might need a separate API for all IDs.

        // Check structure based on usage in ArticleCard.tsx:
        // res.data.data.articles
        const articles = articleRes.data.data.articles.map((item) => ({
            url: `${BASE_URL}/articles/${item.id}`,
            lastModified: new Date(item.updatedAt || item.createdAt),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));

        // Dynamic routes: Tags (Fetching tags if possible)
        const tagRes = await request.get<{ data: { id: number, name: string }[] }>("/tags");
        // Check structure based on TagsCard.tsx: res.data.data -> tags[]
        const tags = tagRes.data.data.map((tag) => ({
            url: `${BASE_URL}/tags/${tag.name}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.5,
        }))

        return [...routes, ...articles, ...tags];
    } catch (error) {
        console.error("Failed to generate sitemap:", error);
        return [...routes];
    }
}
