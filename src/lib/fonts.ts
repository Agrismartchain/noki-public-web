import { Montserrat, Noto_Sans_Arabic, Open_Sans } from "next/font/google";

// Titles (charte graphique) — Latin script only.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

// Body copy (charte graphique) — Latin script only.
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

// Arabic script (titles and body): Montserrat/Open Sans do not cover
// Arabic, so Noto Sans Arabic — an OFL-licensed, widely used typeface —
// is used for both roles on the "ar" locale. This choice is not sourced
// from the charte (which does not name an Arabic font); it is a Phase 1
// engineering default pending explicit brand validation (see README).
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

export const fontVariables = `${montserrat.variable} ${openSans.variable} ${notoSansArabic.variable}`;
