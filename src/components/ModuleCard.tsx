import type { ReactNode } from "react";

import styles from "./ModuleCard.module.css";

interface ModuleCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

/**
 * Large "lead module" panel — bigger sibling of FeatureCard, used for the
 * platform's four priority modules. Includes a small abstract UI strip
 * (skeleton rows + chips, aria-hidden, no real data) to read as a product
 * panel rather than a plain text card.
 */
export function ModuleCard({ title, description, icon, badge }: ModuleCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.glow} aria-hidden="true" />
      <div className={styles.header}>
        {icon && (
          <span className={styles.iconTile} aria-hidden="true">
            {icon}
          </span>
        )}
        {badge}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.miniUi} aria-hidden="true">
        <span className={styles.miniRow} style={{ width: "82%" }} />
        <span className={styles.miniRow} style={{ width: "56%" }} />
        <div className={styles.miniFooter}>
          <span className={styles.miniChip} />
          <span className={styles.miniChip} />
          <span className={styles.miniChip} />
        </div>
      </div>
    </div>
  );
}
