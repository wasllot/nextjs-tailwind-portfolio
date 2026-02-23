import { MetadataRoute } from "next";
import { articles } from "./blog/[slug]/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://reinaldotineo.online";

  const blogPosts = Object.entries(articles).map(([slug, article]) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(`${article.date}-01-01`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/consulta-tecnica`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
