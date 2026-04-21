import type { HelperTextBaseProps } from '@switch/types';
import styles from './HelperText.module.css';

export interface HelperTextProps extends HelperTextBaseProps {
  className?: string;
}

const DEFAULT_ICONS: Record<NonNullable<HelperTextBaseProps['variant']>, string> = {
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
};

export function HelperText({ text, variant = 'info', icon, className }: HelperTextProps) {
  const defaultIcon = DEFAULT_ICONS[variant];

  return (
    <div
      className={[styles.container, styles[variant], className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
    >
      <span className={styles.iconWrapper} aria-hidden="true">
        {icon ?? defaultIcon}
      </span>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
