import React from 'react';
import { Input } from '../Input/Input';
import { Select } from '../Input';
import { HelperText } from '../HelperText/HelperText';
import styles from './FormField.module.css';

export interface FormFieldProps {
  /** Field label */
  label: string;
  /** Field name (for form submission) */
  name: string;
  /** Field type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select';
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  /** Options for select type */
  options?: Array<{ label: string; value: string }>;
  /** Helper text shown below field */
  helperText?: string;
  /** Error message (shows error state) */
  error?: string;
  /** Whether field is required */
  required?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Field size */
  size?: 'small' | 'medium' | 'large';
  /** Full width */
  fullWidth?: boolean;
  /** Leading icon */
  leadingIcon?: React.ReactNode;
  /** Trailing icon */
  trailingIcon?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  options,
  helperText,
  error,
  required = false,
  disabled = false,
  size = 'medium',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  className,
}: FormFieldProps) {
  const fieldLabel = required ? `${label} *` : label;
  const hasError = Boolean(error);

  if (type === 'select' && options) {
    return (
      <div className={[styles.field, fullWidth ? styles.fullWidth : '', className].filter(Boolean).join(' ')}>
        <Select
          label={fieldLabel}
          name={name}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
          onBlur={onBlur as (e: React.FocusEvent<HTMLSelectElement>) => void}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          isError={hasError}
          errorMessage={error}
        />
        {helperText && !error && (
          <HelperText text={helperText} variant="info" />
        )}
      </div>
    );
  }

  return (
    <div className={[styles.field, fullWidth ? styles.fullWidth : '', className].filter(Boolean).join(' ')}>
      <Input
        label={fieldLabel}
        name={name}
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        onBlur={onBlur as (e: React.FocusEvent<HTMLInputElement>) => void}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        fullWidth={fullWidth}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        isError={hasError}
        errorMessage={error}
        helperText={!error ? helperText : undefined}
      />
    </div>
  );
}
