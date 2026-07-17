import type { ReactNode } from "react";

import styles from "./ProcessStep.module.css";

interface ProcessStepProps {
  index: number;
  title: string;
  description: string;
  icon?: ReactNode;
  isLast?: boolean;
}

export function ProcessStep({ index, title, description, icon, isLast = false }: ProcessStepProps) {
  return (
    <li className={styles.step}>
      <div className={styles.marker}>
        <span className={styles.markerCircle}>
          <span className={styles.markerIcon} aria-hidden="true">
            {icon}
          </span>
        </span>
        <span className={styles.markerNumber} aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        {!isLast && <span className={styles.connector} aria-hidden="true" />}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  );
}
