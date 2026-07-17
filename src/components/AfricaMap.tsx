import Image from "next/image";
import type { CSSProperties } from "react";

import styles from "./AfricaMap.module.css";

interface Country {
  name: string;
}

interface AfricaMapProps {
  badge: string;
  title: string;
  subtitle: string;
  note: string;
  countries: Country[];
}

const FLAGS = [
  "/visuals/africa/flags/cote-divoire.webp",
  "/visuals/africa/flags/senegal.webp",
  "/visuals/africa/flags/mali.svg",
  "/visuals/africa/flags/cameroun.webp",
  "/visuals/africa/flags/gabon.svg",
  "/visuals/africa/flags/congo.webp",
];

// Approximate marker positions (percentage of the map image's own pixel
// box) for the six targeted markets, estimated from their real-world
// geography against this specific illustration's projection. Set with
// plain physical `top`/`left` inline styles — not CSS logical properties —
// so document `dir="rtl"` (Arabic) never mirrors the geography; only the
// surrounding badge/panel/text, which use logical properties, adapt.
const MARKER_POSITIONS = [
  { top: "43.9%", left: "32%" }, // Côte d'Ivoire
  { top: "34.4%", left: "23.3%" }, // Sénégal
  { top: "37%", left: "29.8%" }, // Mali
  { top: "47.7%", left: "43.9%" }, // Cameroun
  { top: "52%", left: "42.4%" }, // Gabon
  { top: "57.9%", left: "46.6%" }, // Congo
];

/**
 * Africa map visual — a real illustrated market map (supplied asset,
 * public/visuals/africa/noki-africa-target-markets-map.webp) with pulsing
 * markers overlaid at the six targeted markets, and their real flags in
 * the accessible country list below. Marker/flag positions never mirror in
 * RTL (see MARKER_POSITIONS comment); only the surrounding layout does.
 */
export function AfricaMap({ badge, title, subtitle, note, countries }: AfricaMapProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mapStage}>
        <span className={styles.badge}>{badge}</span>
        <div className={styles.imageFrame} aria-hidden="true">
          <Image
            src="/visuals/africa/noki-africa-target-markets-map.webp"
            alt=""
            width={1672}
            height={941}
            className={styles.image}
          />
        </div>
        {/*
         * Markers are siblings of .imageFrame (not children) so the
         * image's own overflow:hidden (used only to round its corners)
         * never clips the expanding pulse rings near the map edges.
         */}
        {MARKER_POSITIONS.slice(0, countries.length).map((pos, index) => (
          <span
            key={countries[index]?.name ?? index}
            className={styles.marker}
            aria-hidden="true"
            style={
              {
                top: pos.top,
                left: pos.left,
                "--marker-delay": `${index * 0.5}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.panel}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <ul className={styles.countryList}>
          {countries.map((country, index) => (
            <li key={country.name} className={styles.countryItem}>
              <Image
                src={FLAGS[index] ?? FLAGS[0]!}
                alt=""
                width={20}
                height={14}
                aria-hidden="true"
                className={styles.flag}
              />
              {country.name}
            </li>
          ))}
        </ul>
        <p className={styles.note}>{note}</p>
      </div>
    </div>
  );
}
