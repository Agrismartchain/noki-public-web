import type { ReactNode } from "react";

import styles from "./CycleTimeline.module.css";

interface CycleStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface CycleTimelineProps {
  steps: CycleStep[];
  activeIndex?: number;
}

/**
 * Large, connected workflow composition for the order cycle — each step is
 * a contextual card on a lit connector line, with one step highlighted as
 * "active" (purely illustrative, not a live status). Wraps into rows on
 * desktop (4-up) and tablet (2-up); the connector is dropped at row
 * boundaries rather than routed around them, matching the row-segmented
 * timeline pattern used by most large workflow UIs.
 */
export function CycleTimeline({ steps, activeIndex = 2 }: CycleTimelineProps) {
  return (
    <ol className={styles.timeline}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={styles.node}
          data-active={index === activeIndex ? "true" : undefined}
          data-last={index === steps.length - 1 ? "true" : undefined}
        >
          <div className={styles.markerRow}>
            <span className={styles.markerCircle}>
              <span className={styles.markerIcon} aria-hidden="true">
                {step.icon}
              </span>
            </span>
            <span className={styles.markerNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className={styles.card}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
