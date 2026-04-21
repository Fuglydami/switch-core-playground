import React from 'react';
import type { ButtonBaseProps } from '@switch/types';
import styles from './Button.module.css';

export interface ButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled' | 'onClick'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'large',
      variant = 'primary',
      shape = 'rectangular',
      colorScheme = 'activeBlue',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className,
      onPress,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading ? 'true' : 'false'}
        onClick={onPress}
        className={[
          styles.button,
          styles[size],
          styles[variant],
          styles[shape],
          styles[colorScheme],
          isLoading ? styles.loading : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {isLoading && (
          <span className={styles.spinner} aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={styles.label}>{children}</span>
        {!isLoading && rightIcon && (
          <span className={styles.iconRight} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
