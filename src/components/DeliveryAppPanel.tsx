import styles from "./DeliveryAppPanel.module.css";

interface DeliveryAppPanelProps {
  chips: string[];
}

/**
 * Abstract tilted-smartphone mockup for the delivery app block — CSS/SVG
 * only, no store screenshot, no store badges. Notification chips carry
 * generic status labels only (no address, client name or amount), matching
 * the functional-truth rule for this in-preparation product.
 */
export function DeliveryAppPanel({ chips }: DeliveryAppPanelProps) {
  return (
    <div className={styles.stage} aria-hidden="true">
      <span className={styles.glow} data-tone="blue" />
      <span className={styles.glow} data-tone="yellow" />

      <div className={styles.phone}>
        <span className={styles.notch} />
        <div className={styles.screen}>
          <div className={styles.screenHeader}>
            <span className={styles.screenDot} />
            <span className={styles.screenRow} style={{ width: "58%" }} />
          </div>
          <div className={styles.screenList}>
            <span className={styles.screenCard} />
            <span className={styles.screenCard} />
            <span className={styles.screenCard} />
          </div>
        </div>
      </div>

      <div className={styles.notifications}>
        {chips.map((chip, index) => (
          <span key={chip} className={styles.notification} data-position={index}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
