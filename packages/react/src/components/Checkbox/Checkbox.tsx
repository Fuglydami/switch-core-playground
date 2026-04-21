import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  /** 'square' (default) or 'circle' (rounded checkbox look) */
  variant?: 'square' | 'circle';
  size?: 16 | 20 | 24;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, variant = 'square', size = 20, indeterminate = false, disabled, id, className, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const internalRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    return (
      <label
        className={[
          styles.wrapper,
          disabled ? styles.disabled : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        htmlFor={inputId}
      >
        <input
          ref={resolvedRef}
          type="checkbox"
          id={inputId}
          disabled={disabled}
          className={styles.hiddenInput}
          {...props}
        />
        <span
          className={[
            styles.control,
            styles[variant],
            styles[`size${size}`],
          ].join(' ')}
          aria-hidden="true"
        >
          {indeterminate ? (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <path d="M1 1h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4l2.5 3L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// ── Radio ──────────────────────────────────────────────────────────────────

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  size?: 16 | 20 | 24;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, size = 20, disabled, id, className, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        className={[styles.wrapper, disabled ? styles.disabled : '', className].filter(Boolean).join(' ')}
        htmlFor={inputId}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          disabled={disabled}
          className={styles.hiddenInput}
          {...props}
        />
        <span
          className={[styles.control, styles.radio, styles[`size${size}`]].join(' ')}
          aria-hidden="true"
        >
          <span className={styles.radioDot} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

// ── Toggle Switch ──────────────────────────────────────────────────────────

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, size = 'medium', disabled, id, className, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        className={[styles.toggleWrapper, disabled ? styles.disabled : '', className].filter(Boolean).join(' ')}
        htmlFor={inputId}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={inputId}
          disabled={disabled}
          className={styles.hiddenInput}
          {...props}
        />
        <span className={[styles.track, styles[`track${size.charAt(0).toUpperCase() + size.slice(1)}`]].join(' ')} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
