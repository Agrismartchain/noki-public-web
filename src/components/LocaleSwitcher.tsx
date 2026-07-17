"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

import styles from "./LocaleSwitcher.module.css";

const localeNativeNames: Record<(typeof locales)[number], string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

interface LocaleSwitcherProps {
  tone?: "light" | "dark";
}

export function LocaleSwitcher({ tone = "light" }: LocaleSwitcherProps) {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  const wrapClass = tone === "dark" ? `${styles.wrap} ${styles.dark}` : styles.wrap;

  return (
    <div className={wrapClass} role="group" aria-label={t("languageLabel")}>
      {locales.map((locale) => {
        const isActive = locale === activeLocale;
        return (
          <button
            key={locale}
            type="button"
            className={isActive ? `${styles.option} ${styles.active}` : styles.option}
            aria-current={isActive ? "true" : undefined}
            lang={locale}
            onClick={() => {
              router.replace(pathname, { locale });
            }}
          >
            {localeNativeNames[locale]}
          </button>
        );
      })}
    </div>
  );
}
