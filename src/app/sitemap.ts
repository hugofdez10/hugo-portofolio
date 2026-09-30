import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales, siteUrl } from "@/lib/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) => [
    {
      url: `${siteUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${siteUrl}/${lang}/work/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ]);
}
