import React from 'react';
import styles from './Divider.module.css';

export interface DividerProps {
  /** Optional centred label */
  label?: React.ReactNode;
  /** Vertical or horizontal */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ label, orientation = 'horizontal', className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={[styles.vertical, className].filter(Boolean).join(' ')}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={[styles.labelled, className].filter(Boolean).join(' ')}
      >
        <span className={styles.line} />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={[styles.horizontal, className].filter(Boolean).join(' ')}
    />
  );
}
