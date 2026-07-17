import styles from "./DecorPanel.module.css";

type DecorTone = "blue" | "cyan";

interface DecorPanelProps {
  tone?: DecorTone;
  className?: string;
}

/**
 * Purely decorative abstract "structured data" panel — skeleton rows and
 * neutral chips only, never real numbers/labels, so it can never be read
 * as a claim about real data.
 */
export function DecorPanel({ tone = "blue", className }: DecorPanelProps) {
  return (
    <div className={[styles.panel, className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className={styles.glow} data-tone={tone} />
      <div className={styles.header}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.rows}>
        <span className={styles.row} style={{ width: "88%" }} />
        <span className={styles.row} style={{ width: "62%" }} />
        <span className={styles.row} style={{ width: "74%" }} />
        <span className={styles.row} style={{ width: "48%" }} />
      </div>
      <div className={styles.footer}>
        <span className={styles.chip} />
        <span className={styles.chip} />
        <span className={styles.chip} />
      </div>
    </div>
  );
}
