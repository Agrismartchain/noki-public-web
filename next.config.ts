import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// script-src needs 'unsafe-inline': this app is statically prerendered
// (generateStaticParams, no per-request dynamic rendering), and Next.js's
// nonce-based CSP requires dynamic rendering to inject a fresh nonce per
// request (see https://nextjs.org/docs/app/guides/content-security-policy
// — "Static pages are generated at build time ... no nonce can be
// injected"). Without 'unsafe-inline' (and no nonce possible), the
// App Router's own inline RSC-streaming/hydration scripts are blocked by
// the browser, which breaks hydration for every client component on the
// site (mobile nav, language switcher, scroll animations). This is Next's
// own documented "Without Nonces" recommendation for statically rendered
// apps; keeping static generation (fast TTFB, CDN-cacheable, no per-request
// server cost) is the right tradeoff for a public marketing site with no
// user-specific content and no third-party/user-supplied scripts.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // "/" -> "/fr" is handled deterministically by the next-intl middleware
  // (localeDetection: false, defaultLocale: "fr"), not here, to avoid a
  // second, redundant redirect layer.
};

export default withNextIntl(nextConfig);
