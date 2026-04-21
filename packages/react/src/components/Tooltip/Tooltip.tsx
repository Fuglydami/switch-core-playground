import React, { useState, useRef, useId } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TriggerProps {
  'aria-describedby'?: string;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement<TriggerProps>;
  placement?: TooltipPlacement;
  helperText?: string;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  helperText,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  const childProps = children.props;

  const child = React.cloneElement(children, {
    'aria-describedby': visible ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      childProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      childProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      childProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      childProps.onBlur?.(e);
    },
  });

  return (
    <span className={styles.wrapper}>
      {child}
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={[styles.tooltip, styles[placement]].join(' ')}
        >
          {content}
          {helperText && <span className={styles.helperText}>{helperText}</span>}
          <span className={styles.arrow} aria-hidden="true" />
        </span>
      )}
    </span>
  );
}
