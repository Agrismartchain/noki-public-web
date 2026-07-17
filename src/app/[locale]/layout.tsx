import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isRtlLocale, locales, routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { getSiteUrl, isNoindex } from "@/lib/site";
import "@/styles/globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = getSiteUrl();

  const languageAlternates: Record<string, string> = {};
  for (const loc of locales) {
    languageAlternates[loc] = `${siteUrl}/${loc}`;
  }
  languageAlternates["x-default"] = `${siteUrl}/${routing.defaultLocale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: languageAlternates,
    },
    robots: isNoindex() ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${locale}`,
      siteName: "NOKI SERVICE",
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = isRtlLocale(locale) ? "rtl" : "ltr";
  const t = await getTranslations({ locale });

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <body>
        {/* No-JS fallback: without the Reveal observer, keep scroll-reveal content visible. */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important;}"}</style>
        </noscript>
        <NextIntlClientProvider>
          <a href="#main-content" className="skip-link">
            {t("skipLink")}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
