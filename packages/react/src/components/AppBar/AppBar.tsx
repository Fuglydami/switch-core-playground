import React from 'react';
import styles from './AppBar.module.css';

export interface AppBarProps {
  title?: string;
  subtitle?: string;
  label?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  titleAlign?: 'left' | 'center';
  size?: 'default' | 'large';
  variant?: 'light' | 'dark';
  className?: string;
}

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AppBar: React.FC<AppBarProps> = ({
  title,
  subtitle,
  label,
  leading,
  trailing,
  onBack,
  showBack = false,
  titleAlign = 'center',
  size = 'default',
  variant = 'light',
  className = '',
}) => {
  const renderLeading = () => {
    if (leading) return leading;
    if (showBack && onBack) {
      return (
        <button type="button" className={styles.back} onClick={onBack} aria-label="Go back">
          <BackIcon />
        </button>
      );
    }
    return null;
  };

  const alignClass = titleAlign === 'left' ? styles.alignLeft : styles.alignCenter;

  return (
    <header className={`${styles.appbar} ${styles[variant]} ${styles[size]} ${alignClass} ${className}`}>
      <div className={styles.content}>
        <div className={styles.leading}>{renderLeading()}</div>
        <div className={styles.center}>
          {label && <span className={styles.label}>{label}</span>}
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
        <div className={styles.trailing}>{trailing}</div>
      </div>
    </header>
  );
};

export interface AppBarActionProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: number | string;
  disabled?: boolean;
}

export const AppBarAction: React.FC<AppBarActionProps> = ({
  icon,
  label,
  onClick,
  badge,
  disabled,
}) => (
  <button type="button" className={styles.action} onClick={onClick} disabled={disabled} aria-label={label}>
    {icon}
    {badge !== undefined && <span className={styles.actionBadge}>{badge}</span>}
  </button>
);
