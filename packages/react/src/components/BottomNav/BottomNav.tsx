import React from 'react';
import styles from './BottomNav.module.css';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  variant?: 'outline' | 'fill' | 'outline-fill';
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeId,
  onSelect,
  variant = 'outline-fill',
  className = '',
}) => {
  const handleClick = (item: BottomNavItem) => {
    if (!item.disabled) {
      onSelect?.(item.id);
    }
  };

  return (
    <nav
      className={`${styles.nav} ${styles[variant]} ${className}`}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className={styles.list} role="tablist">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const showFilledIcon = variant === 'fill' || (variant === 'outline-fill' && isActive);
          const icon = showFilledIcon && item.activeIcon ? item.activeIcon : item.icon;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={item.disabled}
              className={`${styles.item} ${isActive ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`}
              onClick={() => handleClick(item)}
              disabled={item.disabled}
            >
              <span className={styles.icon}>
                {icon}
                {item.badge !== undefined && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </span>
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
