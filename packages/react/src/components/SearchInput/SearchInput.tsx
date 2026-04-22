import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '../Input/Input';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Called with debounced search value */
  onSearch?: (value: string) => void;
  /** Called on every change (not debounced) */
  onChange?: (value: string) => void;
  /** Debounce delay in ms */
  debounceMs?: number;
  /** Input size */
  size?: 'small' | 'medium' | 'large';
  /** Full width */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state - shows spinner */
  isLoading?: boolean;
  /** Additional class name */
  className?: string;
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" fill="currentColor" opacity="0.1" />
      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className={styles.spinner} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SearchInput({
  placeholder = 'Search...',
  value: controlledValue,
  onSearch,
  onChange,
  debounceMs = 300,
  size = 'medium',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const value = controlledValue ?? internalValue;

  // Debounced search
  useEffect(() => {
    if (!onSearch) return;

    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  const handleClear = useCallback(() => {
    setInternalValue('');
    onChange?.('');
    onSearch?.('');
  }, [onChange, onSearch]);

  return (
    <div className={[styles.wrapper, fullWidth ? styles.fullWidth : '', className].filter(Boolean).join(' ')}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        leadingIcon={<SearchIcon />}
        trailingIcon={
          isLoading ? (
            <Spinner />
          ) : value ? (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          ) : null
        }
      />
    </div>
  );
}
