import React from 'react';
import styles from './ListItem.module.css';

export type ListItemVariant = 'label' | 'label-avatar' | 'label-icon' | 'label-control';

export interface ListItemProps {
  variant?: ListItemVariant;
  label: string;
  sublabel?: string;
  avatar?: { src?: string; initials: string };
  leadingIcon?: React.ReactNode;
  control?: React.ReactNode;
  onClick?: () => void;
}

function Avatar({ src, initials }: { src?: string; initials: string }) {
  if (src) {
    return <img src={src} alt={initials} className={styles.avatarImg} />;
  }
  return (
    <span className={styles.avatarInitials} aria-label={initials}>
      {initials.slice(0, 2).toUpperCase()}
    </span>
  );
}

export function ListItem({
  variant = 'label',
  label,
  sublabel,
  avatar,
  leadingIcon,
  control,
  onClick,
}: ListItemProps) {
  const isInteractive = Boolean(onClick);

  const content = (
    <>
      {variant === 'label-avatar' && avatar && (
        <span className={styles.avatar}>
          <Avatar {...avatar} />
        </span>
      )}
      {variant === 'label-icon' && leadingIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </span>
      {variant === 'label-control' && control && (
        <span className={styles.control}>{control}</span>
      )}
    </>
  );

  if (isInteractive) {
    return (
      <button
        className={[styles.item, styles.interactive].join(' ')}
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    );
  }

  return <div className={styles.item}>{content}</div>;
}
