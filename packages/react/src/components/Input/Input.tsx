import React from 'react';
import type { InputSize, InputType } from '@switch/types';
import styles from './Input.module.css';

export type { InputType, InputSize };

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Visual type matching Figma variants */
  inputType?: InputType;
  label?: string;
  helperText?: string;
  /** Error message (sets error state automatically) */
  errorMessage?: string;
  /** Success message (sets success state automatically) */
  successMessage?: string;
  /** Warning message (sets warning state automatically) */
  warningMessage?: string;
  /** Explicit error state */
  isError?: boolean;
  /** Explicit success state */
  isSuccess?: boolean;
  /** Explicit warning state */
  isWarning?: boolean;
  /** Input size: small (32px), medium (40px), large (48px) */
  size?: InputSize;
  /** Leading content — icon, flag, etc. */
  leftAddon?: React.ReactNode;
  /** Trailing content — icon, button, etc. */
  rightAddon?: React.ReactNode;
  /** For pre-select / post-select: the selector element */
  selectAddon?: React.ReactNode;
  /** Controlled value for PIN inputs */
  pinValues?: string[];
  onPinChange?: (values: string[]) => void;
}

// ── PIN input ─────────────────────────────────────────────────────────────
function PinInput({
  length,
  values,
  onChange,
  disabled,
  isError,
  isSuccess,
  isWarning,
  size = 'medium',
}: {
  length: 4 | 6;
  values: string[];
  onChange: (v: string[]) => void;
  disabled?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
  size?: InputSize;
}) {
  const refsArray = React.useRef<(HTMLInputElement | null)[]>([]);

  const setRef = (i: number) => (el: HTMLInputElement | null) => {
    refsArray.current[i] = el;
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[i] && i > 0) {
      refsArray.current[i - 1]?.focus();
    }
  };

  const handleChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...values];
    next[i] = digit;
    onChange(next);
    if (digit && i < length - 1) refsArray.current[i + 1]?.focus();
  };

  return (
    <div className={styles.pinRow}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={setRef(i)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[i] ?? ''}
          disabled={disabled}
          aria-label={`PIN digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          className={[
            styles.pinCell,
            styles[size],
            isError ? styles.pinCellError : '',
            isSuccess ? styles.pinCellSuccess : '',
            isWarning ? styles.pinCellWarning : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ))}
    </div>
  );
}

// ── Main Input ────────────────────────────────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputType = 'default',
      label,
      helperText,
      errorMessage,
      successMessage,
      warningMessage,
      isError = false,
      isSuccess = false,
      isWarning = false,
      size = 'medium',
      leftAddon,
      rightAddon,
      selectAddon,
      pinValues,
      onPinChange,
      id,
      className,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;

    // Determine message states
    const hasError = isError || Boolean(errorMessage);
    const hasSuccess = isSuccess || Boolean(successMessage);
    const hasWarning = isWarning || Boolean(warningMessage);

    // Get the appropriate message to display
    const message = errorMessage || successMessage || warningMessage || helperText;
    const describedBy = message ? helperId : undefined;

    const wrapperClass = [
      styles.inputWrapper,
      styles[size],
      hasError ? styles.error : '',
      hasSuccess ? styles.success : '',
      hasWarning ? styles.warning : '',
      disabled ? styles.disabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    // ── PIN types ──────────────────────────────────────────────────────────
    if (inputType === 'pin-4' || inputType === 'pin-6') {
      const len = inputType === 'pin-4' ? 4 : 6;
      const vals = pinValues ?? Array(len).fill('');
      return (
        <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          )}
          <PinInput
            length={len}
            values={vals}
            onChange={onPinChange ?? (() => {})}
            disabled={disabled}
            isError={hasError}
            isSuccess={hasSuccess}
            isWarning={hasWarning}
            size={size}
          />
          {message && (
            <p
              id={helperId}
              className={[
                styles.helperText,
                hasError ? styles.errorText : '',
                hasSuccess ? styles.successText : '',
                hasWarning ? styles.warningText : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {message}
            </p>
          )}
        </div>
      );
    }

    // ── Message (textarea) ─────────────────────────────────────────────────
    if (inputType === 'message') {
      return (
        <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          )}
          <div className={[wrapperClass, styles.textareaWrapper].filter(Boolean).join(' ')}>
            <textarea
              id={inputId}
              disabled={disabled}
              aria-invalid={hasError ? 'true' : 'false'}
              aria-describedby={describedBy}
              placeholder={placeholder ?? 'Message'}
              className={[styles.textarea, styles[size]].filter(Boolean).join(' ')}
            />
          </div>
          {(errorMessage || helperText) && (
            <p id={helperId} className={[styles.helperText, hasError ? styles.errorText : ''].filter(Boolean).join(' ')}>
              {errorMessage || helperText}
            </p>
          )}
        </div>
      );
    }

    // ── Default / Search / Pre-Select / Post-Select ───────────────────────
    const isSearch = inputType === 'search';
    const isPreSelect = inputType === 'pre-select';
    const isPostSelect = inputType === 'post-select';

    return (
      <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={wrapperClass}>
          {/* Pre-select: selector on the left */}
          {isPreSelect && selectAddon && (
            <span className={[styles.addon, styles.selectAddon].filter(Boolean).join(' ')}>
              {selectAddon}
            </span>
          )}

          {/* Search icon or custom left addon */}
          {isSearch && (
            <span className={styles.addon} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
                <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </span>
          )}
          {!isSearch && leftAddon && (
            <span className={styles.addon} aria-hidden="true">
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={isSearch ? 'search' : 'text'}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            placeholder={placeholder ?? (isSearch ? 'Search' : 'Placeholder')}
            className={styles.input}
            {...props}
          />

          {/* Right addon or clear button for search */}
          {isSearch && (
            <span className={styles.addon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </span>
          )}
          {!isSearch && rightAddon && (
            <span className={styles.addon} aria-hidden="true">
              {rightAddon}
            </span>
          )}

          {/* Post-select: selector on the right */}
          {isPostSelect && selectAddon && (
            <span className={[styles.addon, styles.selectAddon].filter(Boolean).join(' ')}>
              {selectAddon}
            </span>
          )}
        </div>
        {(errorMessage || helperText) && (
          <p
            id={helperId}
            className={[styles.helperText, hasError ? styles.errorText : ''].filter(Boolean).join(' ')}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
