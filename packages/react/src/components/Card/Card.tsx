import React from 'react';
import styles from './Card.module.css';

// ── Base Card ──────────────────────────────────────────────────────────────

export interface CardProps {
  children: React.ReactNode;
  /** Optional shadow depth */
  shadow?: 'none' | 'base' | 'small' | 'medium';
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Make the entire card a clickable element */
  onClick?: () => void;
  className?: string;
}

export function Card({ children, shadow = 'base', padding = 'medium', onClick, className }: CardProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={[
        styles.card,
        styles[`shadow-${shadow}`],
        styles[`pad-${padding}`],
        onClick ? styles.clickable : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}

// ── Stat / Metric Card ─────────────────────────────────────────────────────

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: TrendDirection;
  };
  /** "View Details" or similar CTA label */
  action?: string;
  onAction?: () => void;
  /** Optional icon or illustration in corner */
  icon?: React.ReactNode;
  className?: string;
}

function TrendArrow({ direction }: { direction: TrendDirection }) {
  if (direction === 'up') return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 9l4-6 4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (direction === 'down') return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 3l4 6 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return null;
}

export function StatCard({ title, value, trend, action, onAction, icon, className }: StatCardProps) {
  const trendColor =
    trend?.direction === 'up' ? styles.trendUp :
    trend?.direction === 'down' ? styles.trendDown :
    styles.trendNeutral;

  return (
    <div className={[styles.statCard, className].filter(Boolean).join(' ')}>
      <div className={styles.statHeader}>
        <span className={styles.statTitle}>{title}</span>
        {icon && <span className={styles.statIcon}>{icon}</span>}
      </div>

      <div className={styles.statValueRow}>
        <span className={styles.statValue}>{value}</span>
        {trend && (
          <span className={[styles.trend, trendColor].join(' ')}>
            <TrendArrow direction={trend.direction} />
            {trend.value}
          </span>
        )}
      </div>

      {action && (
        <button type="button" className={styles.statAction} onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}
