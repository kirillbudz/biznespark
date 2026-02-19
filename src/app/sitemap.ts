import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site-url";

const routes = [
  "",
  "/projects/krepost",
  "/projects/gastello",
  "/zhk",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: path ? `${baseUrl}${path}` : baseUrl,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("weekly" as const),
    priority: path === "" ? 1 : 0.8,
  }));
}
