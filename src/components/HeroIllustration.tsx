import type { ReactNode } from "react";

import styles from "./HeroIllustration.module.css";

interface Stage {
  title: string;
  icon: ReactNode;
}

interface HeroIllustrationProps {
  stages: Stage[];
}

/**
 * Abstract, illustrative composition of a generic operational flow board —
 * not a screenshot of the real admin, and no invented metrics (bars/ring
 * and the mini timeline are decorative shapes only, never labelled with
 * numbers). `stages` doubles as the floating annotated cards and the source
 * for the compact in-panel timeline dots (same five conceptual moments,
 * shown twice at different levels of detail).
 */
export function HeroIllustration({ stages }: HeroIllustrationProps) {
  const activeIndex = Math.min(2, stages.length - 1);

  return (
    <div className={styles.stage} aria-hidden="true">
      <span className={styles.glow} data-variant="cyan" />
      <span className={styles.glow} data-variant="blue" />

      <svg className={styles.connectors} viewBox="0 0 400 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-electric-blue)" />
            <stop offset="55%" stopColor="var(--color-electric-cyan)" />
            <stop offset="100%" stopColor="var(--color-yellow)" />
          </linearGradient>
        </defs>
        <path d="M200 200 L20 60" />
        <path d="M200 200 L385 95" />
        <path d="M200 200 L375 330" />
        <path d="M200 200 L200 392" />
        <path d="M200 200 L15 315" />
      </svg>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelDot} />
          <span className={styles.panelDot} />
          <span className={styles.panelDot} />
        </div>
        <div className={styles.panelBody}>
          <div className={styles.miniTimeline}>
            <span className={styles.timelineTrack} />
            {stages.map((stage, index) => (
              <span
                key={stage.title}
                className={styles.timelineNode}
                data-active={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
          <div className={styles.skeletonRow} style={{ width: "78%" }} />
          <div className={styles.skeletonRow} style={{ width: "54%" }} />
          <div className={styles.metrics}>
            <span className={styles.ring} />
            <div className={styles.bars}>
              <span style={{ height: "40%" }} />
              <span style={{ height: "70%" }} />
              <span style={{ height: "55%" }} />
              <span style={{ height: "85%" }} />
              <span style={{ height: "62%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chips}>
        {stages.map((stage, index) => (
          <div key={stage.title} className={styles.chip} data-position={index}>
            <span className={styles.chipIcon}>{stage.icon}</span>
            <span className={styles.chipLabel}>{stage.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
