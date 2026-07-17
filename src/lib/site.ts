export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function isNoindex(): boolean {
  return process.env.NEXT_PUBLIC_NOINDEX !== "false";
}
