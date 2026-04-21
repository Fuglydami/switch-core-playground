export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary';

export interface AlertBaseProps {
  variant?: AlertVariant;
  title?: string;
  /** Show dismiss button */
  dismissible?: boolean;
  onDismiss?: () => void;
}
