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
