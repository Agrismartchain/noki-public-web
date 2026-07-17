import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "src");
const PUBLIC_DIR = join(ROOT, "public");

function listFiles(dir: string, extensions: string[]): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
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

const sourceFiles = listFiles(SRC_DIR, [".ts", ".tsx", ".css", ".json"]);
const sourceContents = sourceFiles.map((file) => ({
  file,
  content: readFileSync(file, "utf8"),
}));

describe("forbidden logo asset", () => {
  it("never references the rejected 'transparent' logo (fake checkerboard, no real alpha)", () => {
    const offenders = sourceContents
      .filter(({ content }) => content.includes("noki-logo-transparent"))
      .map(({ file }) => file);

    expect(offenders).toEqual([]);
  });

  it("does not ship the transparent logo file under public/", () => {
    const publicFiles = listFiles(PUBLIC_DIR, [".png", ".jpg", ".jpeg", ".webp", ".svg"]);
    const offenders = publicFiles.filter((file) => file.includes("transparent"));

    expect(offenders).toEqual([]);
  });

  it("public/brand only ships the approved provisional yellow logo", () => {
    const brandDir = join(PUBLIC_DIR, "brand");
    const files = readdirSync(brandDir);

    expect(files).toEqual(["noki-logo-yellow.png"]);
  });
});

describe("no authentication surface in Phase 1", () => {
  it("has no /login, /signin, /signup or /register route segment", () => {
    const forbiddenSegments = ["login", "signin", "sign-in", "signup", "sign-up", "register", "onboarding"];
    const appDir = join(SRC_DIR, "app");
    const allDirs = listFiles(appDir, [".tsx", ".ts"]).map((f) => f.toLowerCase());

    for (const segment of forbiddenSegments) {
      const offenders = allDirs.filter((f) => f.includes(`/${segment}/`) || f.includes(`${segment}.tsx`));
      expect(offenders, `found forbidden "${segment}" route file(s)`).toEqual([]);
    }
  });

  it("has no href pointing at a login/register/onboarding path", () => {
    const pattern = /href=(\{?["'`])\/?(fr|en|ar)?\/?(login|signin|sign-in|signup|sign-up|register|onboarding)/i;
    const offenders = sourceContents.filter(({ content }) => pattern.test(content)).map(({ file }) => file);

    expect(offenders).toEqual([]);
  });

  it("no translation key or value mentions login/connexion as a real navigation target", () => {
    const forbidden = ["se connecter", "connexion", "log in", "sign in"];
    const offenders: string[] = [];

    for (const { file, content } of sourceContents) {
      if (!file.endsWith(".json")) continue;
      const lower = content.toLowerCase();
      for (const term of forbidden) {
        if (lower.includes(term)) {
          offenders.push(`${file}: "${term}"`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});

describe("no active forms in Phase 1", () => {
  it("renders no <form> element anywhere", () => {
    const offenders = sourceContents
      .filter(({ file }) => file.endsWith(".tsx"))
      .filter(({ content }) => /<form[\s>]/i.test(content))
      .map(({ file }) => file);

    expect(offenders).toEqual([]);
  });

  it("never writes to localStorage or sessionStorage", () => {
    const offenders = sourceContents
      .filter(({ content }) => /\b(localStorage|sessionStorage)\b/.test(content))
      .map(({ file }) => file);

    expect(offenders).toEqual([]);
  });

  it("never uses dangerouslySetInnerHTML", () => {
    const offenders = sourceContents
      .filter(({ content }) => content.includes("dangerouslySetInnerHTML"))
      .map(({ file }) => file);

    expect(offenders).toEqual([]);
  });
});

describe("no forbidden capability claims in message dictionaries", () => {
  const forbiddenTerms = [
    "csv",
    "xlsx",
    "shopify",
    "google sheets",
    "whatsapp",
    "otp",
    "mfa",
    "n8n",
  ];

  it("fr/en/ar dictionaries never mention unproven capabilities", () => {
    const messageFiles = sourceFiles.filter((f) => f.includes(`${join("src", "messages")}${"/"}`));
    const offenders: string[] = [];

    for (const file of messageFiles) {
      const lower = readFileSync(file, "utf8").toLowerCase();
      for (const term of forbiddenTerms) {
        if (lower.includes(term)) {
          offenders.push(`${file}: "${term}"`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});
