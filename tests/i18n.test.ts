import { hasLocale } from "next-intl";
import { describe, expect, it } from "vitest";

import { defaultLocale, isRtlLocale, locales, routing } from "@/i18n/routing";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function collectKeyPaths(value: JsonValue, prefix = ""): Set<string> {
  const keys = new Set<string>();

  if (Array.isArray(value)) {
    for (const item of value) {
      for (const key of collectKeyPaths(item, prefix)) {
        keys.add(key);
      }
    }
    return keys;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      for (const collected of collectKeyPaths(nested, nextPrefix)) {
        keys.add(collected);
      }
    }
    return keys;
  }

  keys.add(prefix);
  return keys;
}

describe("locales", () => {
  it("exposes exactly fr, en and ar", () => {
    expect(locales).toEqual(["fr", "en", "ar"]);
  });

  it("defaults to fr", () => {
    expect(defaultLocale).toBe("fr");
    expect(routing.defaultLocale).toBe("fr");
  });

  it("accepts only the three configured locales", () => {
    expect(hasLocale(routing.locales, "fr")).toBe(true);
    expect(hasLocale(routing.locales, "en")).toBe(true);
    expect(hasLocale(routing.locales, "ar")).toBe(true);
    expect(hasLocale(routing.locales, "es")).toBe(false);
    expect(hasLocale(routing.locales, "de")).toBe(false);
    expect(hasLocale(routing.locales, "")).toBe(false);
  });
});

describe("RTL direction", () => {
  it("flags only ar as RTL", () => {
    expect(isRtlLocale("ar")).toBe(true);
    expect(isRtlLocale("fr")).toBe(false);
    expect(isRtlLocale("en")).toBe(false);
  });
});

describe("message dictionaries", () => {
  const keySets: Record<string, Set<string>> = {
    fr: collectKeyPaths(fr),
    en: collectKeyPaths(en),
    ar: collectKeyPaths(ar),
  };

  it("fr, en and ar expose the same set of translation keys", () => {
    const frKeys = keySets.fr!;
    const enKeys = keySets.en!;
    const arKeys = keySets.ar!;

    const missingInEn = [...frKeys].filter((key) => !enKeys.has(key));
    const missingInAr = [...frKeys].filter((key) => !arKeys.has(key));
    const extraInEn = [...enKeys].filter((key) => !frKeys.has(key));
    const extraInAr = [...arKeys].filter((key) => !frKeys.has(key));

    expect(missingInEn).toEqual([]);
    expect(missingInAr).toEqual([]);
    expect(extraInEn).toEqual([]);
    expect(extraInAr).toEqual([]);
  });

  it("has no empty string values in any locale", () => {
    function findEmptyPaths(value: JsonValue, prefix = ""): string[] {
      if (Array.isArray(value)) {
        return value.flatMap((item, index) => findEmptyPaths(item, `${prefix}[${index}]`));
      }
      if (value !== null && typeof value === "object") {
        return Object.entries(value).flatMap(([key, nested]) =>
          findEmptyPaths(nested, prefix ? `${prefix}.${key}` : key),
        );
      }
      if (typeof value === "string" && value.trim() === "") {
        return [prefix];
      }
      return [];
    }

    for (const [locale, dict] of Object.entries({ fr, en, ar })) {
      const emptyPaths = findEmptyPaths(dict);
      expect(emptyPaths, `${locale} has empty values at: ${emptyPaths.join(", ")}`).toEqual([]);
    }
  });
});
