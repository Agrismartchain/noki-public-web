import styles from "./GovernancePanel.module.css";

interface GovernancePanelProps {
  publicFormulation: string;
  rolesLabel: string;
  permissionsLabel: string;
  scopeLabel: string;
  serviceAccountLabel: string;
  validationLabel: string;
  logLabel: string;
}

/**
 * Large governance/control panel — roles, permissions, organizational
 * scope, limited service account, multi-step validation and an action log.
 * Labels are real accessible text; values/steps/log rows are abstract
 * decorative shapes only (no real usernames, emails, IPs or permission
 * names — public-safe by construction).
 */
export function GovernancePanel({
  publicFormulation,
  rolesLabel,
  permissionsLabel,
  scopeLabel,
  serviceAccountLabel,
  validationLabel,
  logLabel,
}: GovernancePanelProps) {
  return (
    <div className={styles.panel}>
      <span className={styles.glow} aria-hidden="true" />
      <p className={styles.formulation}>{publicFormulation}</p>
      <div className={styles.grid}>
        <div className={styles.column}>
          {[rolesLabel, permissionsLabel, scopeLabel, serviceAccountLabel].map((label) => (
            <div key={label} className={styles.row}>
              <span className={styles.rowLabel}>{label}</span>
              <span className={styles.rowValue} aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <p className={styles.columnLabel}>{validationLabel}</p>
          <div className={styles.steps} aria-hidden="true">
            <span className={styles.step} data-state="done" />
            <span className={styles.step} data-state="done" />
            <span className={styles.step} data-state="active" />
          </div>
          <p className={styles.columnLabel}>{logLabel}</p>
          <div className={styles.log} aria-hidden="true">
            <span className={styles.logRow} style={{ width: "85%" }} />
            <span className={styles.logRow} style={{ width: "64%" }} />
            <span className={styles.logRow} style={{ width: "72%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
