import styles from "./ProcessStep.module.css";

interface ProcessStepProps {
  index: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export function ProcessStep({ index, title, description, isLast = false }: ProcessStepProps) {
  return (
    <li className={styles.step}>
      <div className={styles.marker}>
        <span className={styles.markerNumber} aria-hidden="true">
          {index}
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
