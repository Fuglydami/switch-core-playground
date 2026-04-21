import type React from 'react';

/** RN-only component — web uses Tooltip instead */
export interface HelperTextBaseProps {
  text: string;
  variant?: 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
}
