import styles from "./FaqItem.module.css";

interface FaqItemProps {
  question: string;
  answer: string;
}

/**
 * Native <details>/<summary> gives keyboard and screen-reader support
 * (toggle, expanded state) without any custom JavaScript.
 */
export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className={styles.item}>
      <summary className={styles.question}>
        <span>{question}</span>
        <span className={styles.iconWrap} aria-hidden="true">
          <svg viewBox="0 0 20 20" className={styles.icon} focusable="false">
            <path
              d="M5 7.5 10 12.5 15 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>
      <p className={styles.answer}>{answer}</p>
    </details>
  );
}
