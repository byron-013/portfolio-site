import { type MetadataRoute } from "next";
import { getAllSlugs } from "@/app/lib/projects";
import { getAllPostSlugs } from "@/app/lib/posts";

const SITE = "https://byrondelaney.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,         lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/writing`,  lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${SITE}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: `${SITE}/writing/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
