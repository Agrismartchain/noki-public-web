import type { MetadataRoute } from "next";

import { locales, routing } from "@/i18n/routing";
import { getSiteUrl, isNoindex } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isNoindex()) {
    return [];
  }

  const siteUrl = getSiteUrl();

  const languageAlternates: Record<string, string> = {};
  for (const locale of locales) {
    languageAlternates[locale] = `${siteUrl}/${locale}`;
  }
  languageAlternates["x-default"] = `${siteUrl}/${routing.defaultLocale}`;

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    alternates: {
      languages: languageAlternates,
    },
  }));
}
