# noki-public-web

Public marketing website for **NOKI SERVICE** — an operating platform for
cash-on-delivery (COD) e-commerce. This repo is the FR/EN/AR marketing
front door; it is not the operational product itself.

## Stack

- [Next.js](https://nextjs.org) `16.2.10` (App Router, Turbopack) — see
  [Version note](#version-note) below.
- React `19.2.7`
- TypeScript `5.9.3` (strict mode)
- [next-intl](https://next-intl.dev) `4.13.2` for i18n/routing
- pnpm `10.23.0`, Node.js `>=24.0.0 <25`
- Vitest + Testing Library for tests
- Plain CSS (CSS Modules + custom properties) — no UI framework dependency
- `next/font` for self-hosted Google Fonts (Montserrat, Open Sans, Noto Sans Arabic)

### Version note

The brief for this phase asked for "Next.js 16.3.x stable". At the time
this repo was scaffolded, `16.3.x` only existed as `canary`/`preview`
releases on the npm registry — no stable `16.3.x` had shipped. This repo
therefore uses `16.2.10`, the actual `latest` stable tag, with React
`19.2.7` (its peer-compatible stable release) and TypeScript `5.9.3` (the
current stable 5.x line, chosen over the very new `7.0.x` major for
ecosystem/tooling compatibility). Revisit this pin once a stable `16.3.x`
ships.

## Commands

```bash
pnpm install
pnpm dev          # start the dev server
pnpm build        # production build
pnpm start        # run the production build
pnpm lint         # ESLint (flat config, eslint-config-next)
pnpm typecheck    # tsc --noEmit
pnpm test         # Vitest
pnpm check        # lint + typecheck + test + build, in order
```

## Locales

- `fr` (default), `en`, `ar`.
- Every route is served under `/fr`, `/en` or `/ar` (`localePrefix: "always"`).
- `/` deterministically redirects to `/fr` (no Accept-Language sniffing —
  `localeDetection: false` in `src/proxy.ts` — so the redirect target is
  always predictable).
- All visible copy lives in `src/messages/{fr,en,ar}.json`. No business
  text is hard-coded in components. `src/i18n/request.ts` throws on any
  missing key or unknown locale instead of silently falling back.

## RTL

- `ar` renders `<html lang="ar" dir="rtl">`; `fr`/`en` render `dir="ltr"`
  (`src/app/[locale]/layout.tsx`).
- All authored CSS uses logical properties exclusively
  (`margin-inline`, `padding-inline`, `inset-inline`, `border-inline`,
  `text-align: start/end`, flexbox `gap`) — no physical `left`/`right`
  ever appears in `src/**/*.css` (enforced by `tests/rtl.test.ts`).
- Layout primitives (flex rows, the process-step connector, the mobile
  nav panel) mirror automatically under `dir="rtl"` because they rely on
  writing-mode-aware CSS rather than manual left/right flips.

## Architecture

```
src/
  app/
    [locale]/
      layout.tsx       # <html lang/dir>, fonts, Header/Footer, metadata
      page.tsx          # the 12-section homepage
      page.module.css
      not-found.tsx     # localized 404
    icon.png             # provisional favicon (see Assets below)
    robots.ts             # global robots.txt (env-driven noindex)
    sitemap.ts             # global sitemap.xml (fr/en/ar + hreflang)
  components/            # Container, Section, ButtonLink, Header,
                          # MobileNavigation, LocaleSwitcher, Footer,
                          # FeatureCard, ProcessStep, StatusBadge, FaqItem
  i18n/
    routing.ts            # locales, defaultLocale, isRtlLocale()
    navigation.ts          # next-intl typed Link/useRouter/usePathname
    request.ts               # next-intl server config, strict (no silent fallback)
  messages/               # fr.json / en.json / ar.json — single source of copy
  lib/
    fonts.ts                # next/font definitions
    site.ts                  # NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_NOINDEX helpers
  styles/
    tokens.css                # design tokens (colors, type, spacing, radii, shadows)
    globals.css                 # reset + base + focus ring + reduced-motion
  proxy.ts                        # next-intl locale routing (Next.js "proxy" convention)
tests/                              # Vitest: i18n parity, RTL, content policy, components
docs/brand/                          # source charte + logo assets (read-only reference)
public/brand/                          # the one asset actually shipped to the site
```

No `noki-shared-contracts` dependency, no data fetching, no database, no
Redis, no Prisma — this foundation makes zero network calls of its own.

## Content rules (read before adding copy)

Everything on the homepage is scoped to what Phase 0C's backend audit of
`noki-api` actually proved:

- **Presented as available**: end-to-end orders, order confirmation,
  stock/warehouses, fulfillment/dispatch, delivery tracking, COD
  collection, seller remittances, roles & permissions (RBAC),
  multi-organization/country/currency.
- **Presented as "in progress"**, never as available: the advanced
  relationship-based authorization engine (OpenFGA — feature-gated) and
  supervised automation (explicitly framed as product vision, never as
  an operating WhatsApp/voice/n8n integration).
- **Never mentioned, anywhere**: CSV/XLSX import, Shopify, Google
  Sheets, WhatsApp, telephony, GPS, OTP, e-signature, delivery photo,
  customer refunds, MFA, a public driver app, "double validation by two
  distinct people" (only "multi-step validation" is claimed), or a
  database-level-immutable audit log (only application-level logging is
  claimed). `tests/content-policy.test.ts` greps the message dictionaries
  for the clearest of these terms so a future edit can't silently
  reintroduce them.
- **Never invented**: a client, a number, an operated country, a
  certification, a testimonial, an uptime figure.
- **No "Ma boutique" / store-builder / marketplace feature** — explicitly
  out of NOKI's scope, and the FAQ says so directly.

## Limitations of this Phase 1 foundation

- **No active form.** There is no contact or demo-request endpoint in
  `noki-api`. The "Request a demo" CTA scrolls to an honest static
  notice ("The demo request channel will be activated soon.") — no fake
  success state, no `localStorage`, no third-party form service, no
  invented email or phone number.
- **No login, no signup, no onboarding.** `noki-api` exposes
  `POST /v1/auth/login`, but every candidate destination frontend
  (`noki-admin`, `noki-seller-portal`, `noki-operations`,
  `noki-contact-center`, `noki-finance`, `noki-driver-app`) is an empty
  repo with no commits. There is nowhere for a "Log in" button to point,
  so none exists. `tests/content-policy.test.ts` asserts this.
- **No API integration.** This build makes no request to `noki-api` or
  any backend. All content is static, sourced from the message
  dictionaries.
- **`noki-shared-contracts` integration is deferred.** That package is
  not published (`private: true`, no registry, no tarball). Per its own
  `docs/policies/repository-boundaries.md`, this repo must not import
  from `noki-api/src`, copy generated types, or build a local tarball as
  a workaround. Wiring it up is future work, gated on a publication
  decision made in that repo.
- **No handoff to `noki-design-system` yet.** That repo has no commits.
  Design tokens and the primitive components listed above live locally
  under `src/styles` and `src/components` and are written to be
  extractable later (flat token file, no app-specific coupling) without
  becoming a second permanent source of truth in the meantime.
- **No deployment of any kind** has been performed from this session —
  no push, no Docker build, no `noki-infra` change.

## Assets

- **Logo — provisional.** `public/brand/noki-logo-yellow.png` is a
  byte-for-byte copy of `docs/brand/logo/noki-logo-yellow.png` (verified
  by matching SHA-256 checksums at copy time). It is a raster PNG
  (1254×1254, flat `#FDD106`-ish yellow background, not pixel-exact to
  the charte's `#FFD500`), generated by ChatGPT/DALL·E per that file's
  own `Zone.Identifier` provenance metadata — **not an official,
  vector, studio-produced brand asset.** It must be replaced before any
  final/production publication with a real vector (SVG) and a properly
  transparent PNG, colour-matched to `#FFD500`.
- **Logo — forbidden.** `docs/brand/logo/noki-logo-transparent.png`
  **must never be used.** It has no real alpha channel (confirmed via
  `identify`: `Type: TrueColor`, no `Matte`) — its "transparency" is a
  light checkerboard pattern painted directly into the RGB pixels. Using
  it as-is would ship a visible grey checkerboard around the logo. It is
  intentionally not copied into `public/`, and `tests/content-policy.test.ts`
  fails if any source file ever references it.
- **Charte graphique**: `docs/brand/Charte-Graphique-NOKI.pdf` — read in
  full for colors (`#FFD500` / `#000000` / `#FFFFFF`, gray left
  explicitly "to be defined" by the document itself) and fonts
  (Montserrat / Open Sans). It does not name an Arabic font or a final
  gray value; both remain open decisions (see below).
- **Afrique COD reference**: no screenshot file has been committed to
  this repo. Where narrative structure was informed by a reference
  screenshot shown during a prior session, only the *category of
  sections* was used (problem framing, service grid, coverage map,
  "why us", signup) — no text, numbers, country list, or visuals from it
  were copied.

## SEO

- Localized `<title>`/`<meta description>` per locale (`generateMetadata`
  in `src/app/[locale]/layout.tsx`).
- `alternates.canonical` and full `hreflang` (`fr`, `en`, `ar`,
  `x-default`) on every page.
- `src/app/sitemap.ts` and `src/app/robots.ts` are environment-driven:
  when `NEXT_PUBLIC_NOINDEX` is not explicitly `"false"`, the sitemap is
  empty and `robots.txt` disallows everything. Flip it to `"false"` only
  on the human-approved production deployment.
- Localized 404 at `src/app/[locale]/not-found.tsx`.

## Accessibility

- Visible focus ring (`:focus-visible`) globally, never suppressed.
- Skip-to-content link as the first focusable element on every page.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), heading
  hierarchy per section, `aria-labelledby` on every `<section>`.
- Status is never color-only: `StatusBadge` always pairs an icon **and**
  a text label ("Available" / "In progress").
- `FaqItem` uses native `<details>/<summary>` — keyboard and
  screen-reader support with zero custom JavaScript.
- `MobileNavigation` manages `aria-expanded`, moves focus into the panel
  on open, closes on <kbd>Escape</kbd> and returns focus to the toggle.
- `prefers-reduced-motion: reduce` disables transitions/animations
  globally.
- The brand yellow (`#FFD500`) is only ever paired with dark/black ink
  text (`--color-accent-ink`), never white-on-yellow, for contrast.
  `--color-gray-600` is the token documented as the accessible gray for
  secondary text; a full contrast audit against the charte's
  "to be defined" gray is still open (see Decisions below).

## Security baseline

- No secret anywhere in the repo. `.env.example` documents only
  `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_NOINDEX` — both intentionally
  public/non-sensitive (everything prefixed `NEXT_PUBLIC_` is shipped to
  the browser as plain text; nothing sensitive is ever put behind that
  prefix).
- `next.config.ts` sets a restrictive `Content-Security-Policy`
  (`default-src 'self'`, no inline scripts, no third-party origins),
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, and a locked-down
  `Permissions-Policy`.
- No `dangerouslySetInnerHTML`, no open redirects, no third-party
  script, no analytics, no cookies, no `localStorage`/`sessionStorage`
  usage anywhere (enforced by `tests/content-policy.test.ts`).

## Decisions still open (not resolved by this phase)

- Final, colour-accurate, vector + real-transparent logo.
- Canonical gray value (pending an accessibility contrast pass).
- Arabic font: `Noto Sans Arabic` is used as a Phase 1 engineering
  default (OFL-licensed, broad coverage) — the charte does not name an
  Arabic font, so this is not yet a brand-validated choice.
- Publication strategy for `noki-shared-contracts` (blocks any typed API
  integration, not this static foundation).
- Real contact channel, demo request handling, and eventual login
  destination — all depend on decisions and repos outside this one.

## Deployment

None. This phase does not push, build a Docker image, or touch
`noki-infra`.
