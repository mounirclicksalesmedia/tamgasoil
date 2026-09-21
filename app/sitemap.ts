import type { MetadataRoute } from "next";
import { getPages } from "@/lib/content";
import { locales } from "@/lib/i18n";

const SITE_URL = "https://tamoilgas.com";
const PAGES = ["", "/about", "/solutions", "/blog", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of PAGES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/blog" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${page}`,
            ar: `${SITE_URL}/ar${page}`,
          },
        },
      });
    }

    for (const post of getPages(locale).blog.posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: {
          languages: {
            en: `${SITE_URL}/en/blog/${post.slug}`,
            ar: `${SITE_URL}/ar/blog/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
