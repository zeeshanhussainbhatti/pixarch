import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { locations } from "@/data/locations";
import { posts } from "@/data/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts[0]?.modified ?? posts[0]?.date;
  const page = (path: string, priority: number, lastModified?: string | null) => ({
    url: absoluteUrl(path),
    priority,
    changeFrequency: "monthly" as const,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    page("/", 1),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    page("/projects", 0.8),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.7)),
    page("/locations", 0.8),
    ...locations.map((l) => page(`/locations/${l.slug}`, 0.8)),
    page("/about", 0.6),
    page("/contact", 0.6),
    page("/blog", 0.7, latestPost),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.6, p.modified ?? p.date)),
  ];
}
