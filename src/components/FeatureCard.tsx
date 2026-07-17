import type { ReactNode } from "react";

import styles from "./FeatureCard.module.css";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

export function FeatureCard({ title, description, icon, badge }: FeatureCardProps) {
  return (
    <div className={styles.card}>
      {(icon || badge) && (
        <div className={styles.header}>
          {icon && (
            <span className={styles.iconTile} aria-hidden="true">
              {icon}
            </span>
          )}
          {badge}
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
