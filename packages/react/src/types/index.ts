import type React from 'react';

// Button types
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link' | 'tonal';
export type ButtonShape = 'rectangular' | 'pill' | 'square' | 'circle';
export type ButtonColor = 'popBlue' | 'activeBlue' | 'primaryBlue' | 'monochrome';

export interface ButtonBaseProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  colorScheme?: ButtonColor;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

// HelperText types
export interface HelperTextBaseProps {
  text: string;
  variant?: 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
}

// DatePicker types
export interface DatePickerBaseProps {
  value?: Date | null;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

// Input types
export type InputSize = 'small' | 'medium' | 'large';
export type InputType = 'default' | 'message' | 'pre-select' | 'post-select' | 'search' | 'pin-4' | 'pin-6';
export type InputMessageState = 'error' | 'warning' | 'success';

export interface InputBaseProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  size?: InputSize;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectBaseProps {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  helperText?: string;
  value?: string;
  onChangeValue?: (value: string) => void;
  disabled?: boolean;
}
