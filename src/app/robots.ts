import { MetadataRoute } from "next";
import clinicConfig from "@/config/clinic";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = clinicConfig.seo.siteUrl || "https://example.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
