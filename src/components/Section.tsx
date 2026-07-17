import type { ReactNode } from "react";

import styles from "./Section.module.css";

type SectionTone = "default" | "muted" | "inverted" | "accent";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  ariaLabelledBy?: string;
  className?: string;
}

// Non-null assertions: these class names are defined in
// Section.module.css (co-located, statically known), so the CSS
// module's index-signature typing never actually resolves to undefined.
const toneClass: Record<SectionTone, string> = {
  default: styles.default!,
  muted: styles.muted!,
  inverted: styles.inverted!,
  accent: styles.accent!,
};

export function Section({
  id,
  tone = "default",
  children,
  ariaLabelledBy,
  className,
}: SectionProps) {
  const classes = [styles.section, toneClass[tone], className].filter(Boolean).join(" ");

  return (
    <section id={id} className={classes} aria-labelledby={ariaLabelledBy}>
      {children}
    </section>
  );
}
