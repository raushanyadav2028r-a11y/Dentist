import { MetadataRoute } from "next";
import clinicConfig from "@/config/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = clinicConfig.seo.siteUrl || "https://example.com";
  const now = new Date();

  const routes = [
    "",
    "/services",
    "/specialists",
    "/testimonials",
    "/book",
    "/contact",
    "/about",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
