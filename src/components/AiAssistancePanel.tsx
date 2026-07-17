import styles from "./AiAssistancePanel.module.css";

type WorkflowStatus = "done" | "active" | "pending" | "human";

interface WorkflowStep {
  label: string;
  status: WorkflowStatus;
}

interface SupervisionPanel {
  eyebrow: string;
  summaryLabel: string;
  summaryValue: string;
  recommendationLabel: string;
  recommendationValue: string;
  confidenceLabel: string;
  confidenceValue: string;
  transferLabel: string;
  logLabel: string;
  logEntries: string[];
}

interface AiAssistancePanelProps {
  workflow: WorkflowStep[];
  statusLabels: Record<WorkflowStatus, string>;
  panel: SupervisionPanel;
}

/**
 * Two-column supervised-automation composition: a workflow with one active
 * step and explicit status badges (left), and a supervision panel with a
 * qualitative confidence level and a non-interactive "transfer to a human"
 * badge (right) — never a real button, since no action actually runs here.
 * No percentages, no financial figures, no auto-approved sensitive action.
 */
export function AiAssistancePanel({ workflow, statusLabels, panel }: AiAssistancePanelProps) {
  return (
    <div className={styles.wrapper}>
      <ol className={styles.workflowList}>
        {workflow.map((step) => (
          <li key={step.label} className={styles.workflowItem} data-status={step.status}>
            <span className={styles.workflowDot} aria-hidden="true" />
            <span className={styles.workflowLabel}>{step.label}</span>
            <span className={styles.workflowBadge} data-status={step.status}>
              {statusLabels[step.status]}
            </span>
          </li>
        ))}
      </ol>

      <div className={styles.supervisionCol}>
        <span className={styles.glow} aria-hidden="true" />
        <p className={styles.panelEyebrow}>{panel.eyebrow}</p>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>{panel.summaryLabel}</span>
          <p className={styles.fieldValue}>{panel.summaryValue}</p>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>{panel.recommendationLabel}</span>
          <p className={styles.fieldValue}>{panel.recommendationValue}</p>
        </div>

        <div className={styles.confidenceRow}>
          <span className={styles.fieldLabel}>{panel.confidenceLabel}</span>
          <span className={styles.confidencePill}>{panel.confidenceValue}</span>
        </div>

        <span className={styles.transferBadge}>{panel.transferLabel}</span>

        <div className={styles.logSection}>
          <span className={styles.fieldLabel}>{panel.logLabel}</span>
          <ul className={styles.logList}>
            {panel.logEntries.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
