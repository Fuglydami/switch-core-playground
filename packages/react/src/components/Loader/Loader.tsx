import styles from './Loader.module.css';

// ── Ring Loader ────────────────────────────────────────────────────────────

export type LoaderSize = 'small' | 'medium' | 'large';

export interface RingLoaderProps {
  /** 0–100. When 100 shows "COMPLETE" text and check icon. */
  progress?: number;
  size?: LoaderSize;
  /** Show percentage text in center (default: true when progress is provided) */
  showPercent?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function RingLoader({
  progress,
  size = 'medium',
  showPercent,
  className,
  'aria-label': ariaLabel = 'Loading',
}: RingLoaderProps) {
  const isComplete = progress === 100;
  const pct = progress !== undefined ? Math.min(100, Math.max(0, progress)) : undefined;
  const shouldShowPercent = showPercent ?? (pct !== undefined);

  // SVG dimensions based on size
  const dimensions = {
    small: { size: 48, strokeWidth: 3, fontSize: 10 },
    medium: { size: 72, strokeWidth: 4, fontSize: 14 },
    large: { size: 120, strokeWidth: 6, fontSize: 20 },
  };

  const { size: svgSize, strokeWidth, fontSize } = dimensions[size];
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = pct !== undefined
    ? circumference - (pct / 100) * circumference
    : circumference * 0.75; // Default indeterminate state

  if (isComplete) {
    return (
      <span
        className={[styles.ring, styles[size], styles.complete, className].filter(Boolean).join(' ')}
        role="img"
        aria-label="Complete"
      >
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={styles.ringSvg}
          style={{ width: svgSize, height: svgSize }}
        >
          {/* Track circle */}
          <circle
            className={styles.ringTrack}
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Filled circle for complete state */}
          <circle
            className={styles.ringFillComplete}
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
        </svg>
        <span className={styles.ringContent}>
          <svg viewBox="0 0 24 24" fill="none" className={styles.checkIcon}>
            <path d="M5 12l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.completeText} style={{ fontSize: fontSize * 0.7 }}>COMPLETE</span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={[styles.ring, styles[size], pct === undefined ? styles.indeterminate : '', className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className={styles.ringSvg}
        style={{ width: svgSize, height: svgSize }}
      >
        {/* Track circle */}
        <circle
          className={styles.ringTrack}
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          className={styles.ringFill}
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {shouldShowPercent && pct !== undefined && (
        <span className={styles.ringPercent} style={{ fontSize }}>
          {Math.round(pct)}%
        </span>
      )}
    </span>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────

export interface ProgressBarProps {
  /** 0–100 */
  value: number;
  size?: 'thin' | 'medium' | 'thick';
  /** Label shown on left */
  label?: string;
  /** Label shown on right (defaults to percentage) */
  trailingLabel?: string;
  /** Show percentage on right */
  showPercent?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  size = 'medium',
  label,
  trailingLabel,
  showPercent = false,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  const right = trailingLabel ?? (showPercent ? `${Math.round(pct)}%` : undefined);

  return (
    <div className={[styles.progressWrapper, className].filter(Boolean).join(' ')}>
      {(label || right) && (
        <div className={styles.progressLabels}>
          {label && <span className={styles.progressLabel}>{label}</span>}
          {right && <span className={styles.progressLabel}>{right}</span>}
        </div>
      )}
      <div
        className={[styles.track, styles[`track${size.charAt(0).toUpperCase() + size.slice(1)}`]].join(' ')}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Step Progress ──────────────────────────────────────────────────────────

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
}

export type StepStatus = 'completed' | 'active' | 'pending';

export interface StepProgressProps {
  steps: ProgressStep[];
  /** Index of the current active step (0-based) */
  activeIndex: number;
  /** 'horizontal' (default) or 'vertical' */
  orientation?: 'horizontal' | 'vertical';
}

export function StepProgress({ steps, activeIndex, orientation = 'horizontal' }: StepProgressProps) {
  const getStatus = (i: number): StepStatus => {
    if (i < activeIndex) return 'completed';
    if (i === activeIndex) return 'active';
    return 'pending';
  };

  return (
    <ol
      className={[styles.stepList, styles[orientation]].join(' ')}
      aria-label="Progress steps"
    >
      {steps.map((step, i) => {
        const status = getStatus(i);
        return (
          <li
            key={step.id}
            className={[styles.step, styles[status]].join(' ')}
            aria-current={status === 'active' ? 'step' : undefined}
          >
            <span className={styles.stepIndicator} aria-hidden="true">
              {status === 'completed' ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l2.5 3L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className={styles.stepNumber}>{i + 1}</span>
              )}
            </span>
            {orientation === 'horizontal' && i < steps.length - 1 && (
              <span className={[styles.connector, i < activeIndex ? styles.connectorDone : ''].filter(Boolean).join(' ')} aria-hidden="true" />
            )}
            <span className={styles.stepText}>
              <span className={styles.stepLabel}>{step.label}</span>
              {step.description && (
                <span className={styles.stepDescription}>{step.description}</span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
