import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AfricaMap } from "../src/components/AfricaMap";
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

    // Marker positions are plain numeric top/left percentages passed as
    // inline styles, and the CSS never applies a dir-conditional
    // transform to the image/markers — so geography can't be mirrored
    // when the page switches to RTL.
    expect(componentSource).not.toMatch(/dir\s*===\s*["']rtl["']/);
    expect(cssSource).not.toMatch(/\[dir=["']rtl["']\]/);
    expect(cssSource).not.toMatch(/scaleX\(-1\)/);
  });

  it("renders as a large, dominant visual (~900-1200px cap), not a small side element", () => {
    const cssSource = readFileSync(join(SRC_DIR, "components", "AfricaMap.module.css"), "utf8");
    const stageRule = cssSource.match(/\.mapStage\s*{[^}]*}/)?.[0] ?? "";

    const remCap = stageRule.match(/min\(100%,\s*([\d.]+)rem\)/)?.[1];
    expect(remCap, "mapStage should cap width via min(100%, <cap>rem)").toBeTruthy();
    // 1rem = 16px in this project's base font-size; the brief asks for a
    // rendered width in the ~900-1200px range on large screens.
    const capPx = Number(remCap) * 16;
    expect(capPx).toBeGreaterThanOrEqual(900);
    expect(capPx).toBeLessThanOrEqual(1200);

    // The map must not still be squeezed into a narrow side column next
    // to the text panel.
    expect(cssSource).not.toMatch(/grid-template-columns:\s*0\.85fr/);
  });

  it("gives each of the six markers a fixed core plus two animated, staggered pulse rings", () => {
    const cssSource = readFileSync(join(SRC_DIR, "components", "AfricaMap.module.css"), "utf8");

    // Fixed core: no animation on .marker itself.
    const markerRule = cssSource.match(/\.marker\s*{[^}]*}/)?.[0] ?? "";
    expect(markerRule).not.toMatch(/animation/);

    // Two animated rings via ::before/::after, referencing a real
    // scale+opacity keyframe (not the generic opacity-only pulse-glow).
    const ringRule = cssSource.match(/\.marker::before,\s*\n?\.marker::after\s*{[^}]*}/)?.[0] ?? "";
    expect(ringRule).toMatch(/animation:\s*africa-ring/);
    expect(ringRule).toMatch(/infinite/);
    expect(ringRule).toMatch(/animation-delay:\s*var\(--marker-delay\)/);

    const keyframe = cssSource.match(/@keyframes africa-ring\s*{[\s\S]*?\n}/)?.[0] ?? "";
    expect(keyframe).toMatch(/scale\(0\.5\)/);
    expect(keyframe).toMatch(/scale\(2\.2\)/);
    expect(keyframe).toMatch(/opacity:\s*0\.75/);

    // Durations must fall inside the 3.2s-4.8s range requested.
    const durations = [...cssSource.matchAll(/animation(?:-duration)?:\s*[^;]*?([\d.]+)s/g)].map((m) =>
      Number(m[1]),
    );
    const ringDurations = durations.filter((d) => d >= 1);
    expect(ringDurations.length).toBeGreaterThan(0);
    for (const d of ringDurations) {
      expect(d).toBeGreaterThanOrEqual(3.2);
      expect(d).toBeLessThanOrEqual(4.8);
    }
  });

  it("renders six markers with distinct animation delays and no store/testimonial content", () => {
    const { container } = render(
      <AfricaMap
        badge="Zones ciblées"
        title="Une plateforme pensée pour plusieurs marchés africains."
        subtitle="Sous-titre de test."
        note="Note de test."
        countries={[
          { name: "Côte d'Ivoire" },
          { name: "Sénégal" },
          { name: "Mali" },
          { name: "Cameroun" },
          { name: "Gabon" },
          { name: "Congo" },
        ]}
      />,
    );

    const markers = container.querySelectorAll('span[aria-hidden="true"][style*="--marker-delay"]');
    expect(markers).toHaveLength(6);

    const delays = Array.from(markers).map((el) => (el as HTMLElement).style.getPropertyValue("--marker-delay"));
    expect(new Set(delays).size).toBe(6);

    // Markers live outside the overflow:hidden image frame so their
    // rings are never clipped near the map edges.
    for (const marker of markers) {
      expect(marker.closest('[class*="imageFrame"]')).toBeNull();
    }
  });

  it("global reduced-motion rule collapses ring animations while the core stays visible", () => {
    const globalsCss = readFileSync(join(SRC_DIR, "styles", "globals.css"), "utf8");
    const startIndex = globalsCss.indexOf("@media (prefers-reduced-motion: reduce)");
    const reducedMotionBlock = startIndex === -1 ? "" : globalsCss.slice(startIndex);

    // The blanket rule targets *, *::before, *::after, which covers the
    // .marker::before/::after ring pseudo-elements without needing a
    // component-specific override; the always-visible core (.marker
    // itself) carries no animation, so it is unaffected either way.
    expect(reducedMotionBlock).toMatch(/\*::before/);
    expect(reducedMotionBlock).toMatch(/\*::after/);
    expect(reducedMotionBlock).toMatch(/animation-duration:\s*0\.01ms\s*!important/);
    expect(reducedMotionBlock).toMatch(/animation-iteration-count:\s*1\s*!important/);
  });
});
