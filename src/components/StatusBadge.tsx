import styles from "./StatusBadge.module.css";

type StatusKind = "available" | "inProgress";

interface StatusBadgeProps {
  status: StatusKind;
  label: string;
}

/**
 * Always renders an icon AND a text label together — status is never
 * communicated by color alone.
 */
export function StatusBadge({ status, label }: StatusBadgeProps) {
  const classes = `${styles.badge} ${status === "available" ? styles.available : styles.inProgress}`;

  return (
    <span className={classes}>
      <span aria-hidden="true" className={styles.icon}>
        {status === "available" ? "✓" : "…"}
      </span>
      {label}
    </span>
  );
}
