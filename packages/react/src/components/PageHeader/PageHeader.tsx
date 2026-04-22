import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '../Breadcrumb/Breadcrumb';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Actions rendered on the right side */
  actions?: React.ReactNode;
  /** Back button click handler */
  onBack?: () => void;
  /** Additional content below title */
  children?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  onBack,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={[styles.header, className].filter(Boolean).join(' ')}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className={styles.breadcrumbs}>
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}

      {/* Title row */}
      <div className={styles.titleRow}>
        <div className={styles.titleArea}>
          {onBack && (
            <button
              type="button"
              className={styles.backBtn}
              onClick={onBack}
              aria-label="Go back"
            >
              <BackIcon />
            </button>
          )}
          <div>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>

        {actions && (
          <div className={styles.actions}>{actions}</div>
        )}
      </div>

      {/* Additional content */}
      {children && (
        <div className={styles.content}>{children}</div>
      )}
    </header>
  );
}
