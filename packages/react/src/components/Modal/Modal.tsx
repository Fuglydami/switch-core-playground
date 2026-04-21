import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import { Button } from '../Button';

export type ModalSize = 'small' | 'medium' | 'large';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: ModalSize;
  showCloseButton?: boolean;
  primaryAction?: {
    label: string;
    onPress: () => void;
    isLoading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { clientX, clientY } = e;
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      onClose();
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  const sizeClass = styles[size];

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${sizeClass}`}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      aria-labelledby="modal-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 id="modal-title" className={styles.title}>
            {title}
          </h3>
          {showCloseButton && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.content}>{children}</div>

        {(primaryAction || secondaryAction) && (
          <div className={styles.footer}>
            {secondaryAction && (
              <Button
                variant="secondary"
                colorScheme="monochrome"
                onPress={secondaryAction.onPress}
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant="primary"
                colorScheme="activeBlue"
                onPress={primaryAction.onPress}
                isLoading={primaryAction.isLoading}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}
