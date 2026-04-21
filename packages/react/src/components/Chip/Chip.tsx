import React from 'react';
import styles from './Chip.module.css';

export interface ChipProps {
  /** Chip label text */
  label: string;
  /** Optional leading icon or flag (16px) */
  icon?: React.ReactNode;
  /** Badge count displayed after label */
  count?: number;
  /** Callback when close button is clicked (shows close button when provided) */
  onRemove?: () => void;
  /** Whether chip is in selected state */
  selected?: boolean;
  /** Callback for selectable chips */
  onSelect?: (selected: boolean) => void;
  /** Chip size variant */
  size?: 'small' | 'medium';
  /** Whether chip is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

export function Chip({
  label,
  icon,
  count,
  onRemove,
  selected = false,
  onSelect,
  size = 'medium',
  disabled = false,
  className,
}: ChipProps) {
  const isSelectable = Boolean(onSelect);

  const handleClick = () => {
    if (disabled || !onSelect) return;
    onSelect(!selected);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <span
      className={[
        styles.chip,
        styles[size],
        selected ? styles.selected : '',
        disabled ? styles.disabled : '',
        isSelectable ? styles.selectable : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role={isSelectable ? 'checkbox' : undefined}
      aria-checked={isSelectable ? selected : undefined}
      aria-disabled={disabled}
      tabIndex={isSelectable && !disabled ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={isSelectable ? handleKeyDown : undefined}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}

      <span className={styles.label}>{label}</span>

      {count !== undefined && (
        <span className={styles.count}>{count}</span>
      )}

      {onRemove && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          aria-label={`Remove ${label}`}
          disabled={disabled}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}
