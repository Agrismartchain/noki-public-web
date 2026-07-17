import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import ar from "../src/messages/ar.json";
import en from "../src/messages/en.json";
import fr from "../src/messages/fr.json";

const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "src");

const locales = { fr, en, ar } as const;

describe("delivery app block — always in preparation, never store badges", () => {
  it("carries an explicit in-preparation status in every locale", () => {
    expect(fr.deliveryApp.status.toLowerCase()).toContain("préparation");
    expect(en.deliveryApp.status.toLowerCase()).toContain("preparation");
    expect(ar.deliveryApp.status).toContain("قيد الإعداد");
  });

  it("the delivery app panel component renders no store badge asset or reference", () => {
    const source = readFileSync(join(SRC_DIR, "components", "DeliveryAppPanel.tsx"), "utf8").toLowerCase();
    const forbidden = ["app store", "play store", "google play", "badge-app", "badge-play"];

    for (const term of forbidden) {
      expect(source.includes(term), `unexpected "${term}" in DeliveryAppPanel.tsx`).toBe(false);
    }
  });

  it("has four benefits and four notification chips in every locale", () => {
    for (const [locale, dict] of Object.entries(locales)) {
      expect(dict.deliveryApp.benefits, `${locale} benefits`).toHaveLength(4);
      expect(dict.deliveryApp.chips, `${locale} chips`).toHaveLength(4);
    }
  });
});

describe("supervised automation block — human validation never skipped", () => {
  it("carries an explicit in-preparation disclaimer in every locale", () => {
    expect(fr.automation.disclaimer.toLowerCase()).toContain("préparation");
    expect(en.automation.disclaimer.toLowerCase()).toContain("preparation");
    expect(ar.automation.disclaimer).toContain("قيد الإعداد");
  });

  it("the workflow always ends on a human-validation step, never auto-approved", () => {
    for (const [locale, dict] of Object.entries(locales)) {
      const workflow = dict.automation.workflow;
      const last = workflow[workflow.length - 1];
      expect(last?.status, `${locale} last workflow step`).toBe("human");
    }
  });

  it("never expresses confidence as a percentage or a numeric score", () => {
    for (const [locale, dict] of Object.entries(locales)) {
      expect(dict.automation.panel.confidenceValue, `${locale} confidence value`).not.toMatch(/\d/);
    }
  });
});

describe("Africa map — targeted zones, never claimed as operated, never mirrored", () => {
  it("lists exactly six countries in every locale", () => {
    for (const [locale, dict] of Object.entries(locales)) {
      expect(dict.multiCountry.map.countries, `${locale} countries`).toHaveLength(6);
      for (const country of dict.multiCountry.map.countries) {
        expect(country.name.length, `${locale} country name`).toBeGreaterThan(0);
      }
    }
  });

  it("ships the map image and a real flag file for each of the six countries", () => {
    const visualsDir = join(ROOT, "public", "visuals", "africa");
    expect(existsSync(join(visualsDir, "noki-africa-target-markets-map.webp"))).toBe(true);

    const flags = ["cote-divoire", "senegal", "mali", "cameroun", "gabon", "congo"];
    for (const slug of flags) {
      const webp = existsSync(join(visualsDir, "flags", `${slug}.webp`));
      const svg = existsSync(join(visualsDir, "flags", `${slug}.svg`));
      expect(webp || svg, `flag asset missing for "${slug}"`).toBe(true);
    }
  });

  it("never claims the listed countries are already operated", () => {
    const forbidden = [
      "présence actuelle",
      "nos agences",
      "couverture active",
      "pays déjà opérés",
      "already operated",
      "current presence",
      "active coverage",
    ];
    const offenders: string[] = [];

    for (const [locale, dict] of Object.entries(locales)) {
      const lower = JSON.stringify(dict).toLowerCase();
      for (const term of forbidden) {
        if (lower.includes(term)) offenders.push(`${locale}: "${term}"`);
      }
    }

    expect(offenders).toEqual([]);
  });

  it("keeps the map geometry outside of any RTL-conditional transform", () => {
    const componentSource = readFileSync(join(SRC_DIR, "components", "AfricaMap.tsx"), "utf8");
    const cssSource = readFileSync(join(SRC_DIR, "components", "AfricaMap.module.css"), "utf8");

    // Country positions are plain numeric cx/cy on <circle>, and the CSS
    // never applies a dir-conditional transform to the svg/landmass —
    // so geography can't be mirrored when the page switches to RTL.
    expect(componentSource).not.toMatch(/dir\s*===\s*["']rtl["']/);
    expect(cssSource).not.toMatch(/\[dir=["']rtl["']\]/);
    expect(cssSource).not.toMatch(/scaleX\(-1\)/);
  });
});
