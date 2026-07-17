import type { ReactNode } from "react";

import styles from "./FeatureCard.module.css";

interface FeatureCardProps {
  title: string;
  description: string;
  badge?: ReactNode;
}

export function FeatureCard({ title, description, badge }: FeatureCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {badge}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
