import styles from "./Eyebrow.module.css";

type EyebrowTone = "default" | "inverted" | "accent";

interface EyebrowProps {
  children: string;
  tone?: EyebrowTone;
}

const toneClass: Record<EyebrowTone, string> = {
  default: styles.default!,
  inverted: styles.inverted!,
  accent: styles.accent!,
};

export function Eyebrow({ children, tone = "default" }: EyebrowProps) {
  return (
    <p className={`${styles.eyebrow} ${toneClass[tone]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </p>
  );
}
