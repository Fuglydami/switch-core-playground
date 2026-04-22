import React from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import styles from './ConfirmModal.module.css';

export interface ConfirmModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when modal should close */
  onClose: () => void;
  /** Called when user confirms */
  onConfirm: () => void;
  /** Modal title */
  title: string;
  /** Modal description/message */
  description?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button variant - use 'primary' for normal actions, destructive styling for delete actions */
  variant?: 'primary' | 'danger';
  /** Loading state for confirm button */
  isLoading?: boolean;
  /** Icon to display above title */
  icon?: React.ReactNode;
}

function WarningIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      <path d="M24 16v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="32" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  isLoading = false,
  icon,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="small" showCloseButton={false}>
      <div className={styles.content}>
        {icon !== undefined ? (
          icon && <div className={styles.icon}>{icon}</div>
        ) : variant === 'danger' ? (
          <div className={[styles.icon, styles.danger].join(' ')}>
            <WarningIcon />
          </div>
        ) : null}

        <h2 className={styles.title}>{title}</h2>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        <div className={styles.actions}>
          <Button
            variant="outline"
            onPress={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            colorScheme={variant === 'danger' ? 'monochrome' : 'activeBlue'}
            onPress={onConfirm}
            isLoading={isLoading}
            className={variant === 'danger' ? styles.dangerBtn : ''}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
