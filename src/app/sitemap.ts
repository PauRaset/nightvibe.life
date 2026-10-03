import type { MetadataRoute } from "next";
import { legalLinks, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const main: MetadataRoute.Sitemap = [
    { url: siteConfig.siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/locales`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
  const legal: MetadataRoute.Sitemap = legalLinks.map((link) => ({
    url: `${siteConfig.siteUrl}${link.href}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.2,
  }));
  return siteConfig.legalPagesReady ? [...main, ...legal] : main;
}
