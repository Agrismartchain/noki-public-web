import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "src");

function listFiles(dir: string, extensions: string[]): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...listFiles(fullPath, extensions));
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("RTL wiring", () => {
  it("the locale layout derives dir from isRtlLocale and applies both lang and dir on <html>", () => {
    const layoutSource = readFileSync(join(SRC_DIR, "app", "[locale]", "layout.tsx"), "utf8");

    expect(layoutSource).toContain("isRtlLocale");
    expect(layoutSource).toMatch(/<html\s+lang=\{locale\}\s+dir=\{dir\}/);
  });

  it("no authored stylesheet uses physical left/right properties", () => {
    const cssFiles = listFiles(SRC_DIR, [".css"]);
    const offenders: string[] = [];

    for (const file of cssFiles) {
      const content = readFileSync(file, "utf8");
      // Matches CSS declarations like "left: 0" / "right: 1rem", not
      // logical properties such as "border-left-color" is intentionally
      // still flagged since only inset-inline/margin-inline/etc. should
      // be used for direction-sensitive layout.
      const matches = content.match(/(^|[^-\w])(left|right)\s*:/g);
      if (matches) {
        offenders.push(`${file}: ${matches.join(", ")}`);
      }
    }

    expect(offenders).toEqual([]);
  });
});
