import React from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  /**
   * Tab variant style
   * - 'underline': Default style with blue underline on active tab
   * - 'icon-label': Icon on left of label with underline behavior
   * - 'pill': Filled pill-shaped background on active tab
   */
  variant?: 'underline' | 'icon-label' | 'pill';
}

const variantClassMap = {
  underline: styles.underline,
  'icon-label': styles.iconLabel,
  pill: styles.pillVariant,
} as const;

export function Tabs({ items, activeId, onChange, variant = 'underline' }: TabsProps) {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const enabledItems = items.filter((item) => !item.disabled);
    const currentEnabledIndex = enabledItems.findIndex((item) => item.id === items[index].id);

    let nextIndex = -1;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = enabledItems.length - 1;
    }

    if (nextIndex >= 0) {
      e.preventDefault();
      onChange(enabledItems[nextIndex].id);
    }
  };

  const variantClass = variantClassMap[variant];

  return (
    <div
      role="tablist"
      className={[styles.tablist, variantClass].join(' ')}
      aria-label="Tabs"
    >
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        // Show icon for icon-label variant, or if icon is provided and variant is not explicitly underline-only
        const showIcon = item.icon && (variant === 'icon-label' || variant === 'pill');

        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={item.disabled}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            onClick={() => !item.disabled && onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={[
              styles.tab,
              isActive ? styles.active : '',
              item.disabled ? styles.disabled : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {showIcon && (
              <span className={styles.tabIcon} aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className={styles.tabLabel}>{item.label}</span>
            {item.badge !== undefined && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
