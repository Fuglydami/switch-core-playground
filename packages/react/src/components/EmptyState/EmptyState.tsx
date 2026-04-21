import React from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  /** Illustration or icon element */
  illustration?: React.ReactNode;
  title: string;
  description?: string;
  /** Primary action button */
  action?: React.ReactNode;
  /** Secondary action (link, ghost button, etc.) */
  secondaryAction?: React.ReactNode;
  className?: string;
}

function DefaultIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <rect x="12" y="20" width="56" height="44" rx="4" fill="var(--switch-color-neutral-200)" />
      <rect x="20" y="30" width="20" height="3" rx="1.5" fill="var(--switch-color-neutral-400)" />
      <rect x="20" y="38" width="40" height="3" rx="1.5" fill="var(--switch-color-neutral-300)" />
      <rect x="20" y="46" width="32" height="3" rx="1.5" fill="var(--switch-color-neutral-300)" />
      <circle cx="56" cy="24" r="10" fill="var(--switch-color-surface-primary)" stroke="var(--switch-color-neutral-300)" strokeWidth="1.5" />
      <path d="M52 24l2.5 2.5L60 20" stroke="var(--switch-color-neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EmptyState({
  illustration,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.illustration} aria-hidden="true">
        {illustration ?? <DefaultIllustration />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {(action || secondaryAction) && (
        <div className={styles.actions}>
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
