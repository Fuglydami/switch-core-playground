import React from 'react';
import styles from './SideNav.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  disabled?: boolean;
  /** Nested children shown when item is active */
  children?: NavItem[];
}

export interface SideNavProps {
  items: NavItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  /** Logo / brand slot at the top */
  logo?: React.ReactNode;
  /** Footer slot at the bottom */
  footer?: React.ReactNode;
  /** 'full' shows label + icon; 'compact' shows icon only */
  variant?: 'full' | 'compact';
  /** Light (default) or dark background */
  theme?: 'light' | 'dark';
  className?: string;
}

function NavItemRow({
  item,
  activeId,
  onNavigate,
  variant,
  depth = 0,
}: {
  item: NavItem;
  activeId?: string;
  onNavigate?: (id: string) => void;
  variant: 'full' | 'compact';
  depth?: number;
}) {
  const isActive = item.id === activeId;
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = React.useState(
    hasChildren ? item.children!.some((c) => c.id === activeId) : false
  );

  const Tag = item.href ? 'a' : 'button';
  const tagProps = item.href
    ? { href: item.href }
    : { type: 'button' as const, onClick: () => { if (!item.disabled) { onNavigate?.(item.id); if (hasChildren) setExpanded((e) => !e); } } };

  return (
    <li className={styles.navListItem}>
      <Tag
        {...tagProps}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={item.disabled}
        aria-expanded={hasChildren ? expanded : undefined}
        className={[
          styles.navItem,
          isActive ? styles.active : '',
          item.disabled ? styles.navItemDisabled : '',
          depth > 0 ? styles.nested : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {item.icon && (
          <span className={styles.navIcon} aria-hidden="true">
            {item.icon}
          </span>
        )}
        {variant === 'full' && (
          <span className={styles.navLabel}>{item.label}</span>
        )}
        {variant === 'full' && item.badge !== undefined && (
          <span className={styles.badge}>{item.badge}</span>
        )}
        {variant === 'full' && hasChildren && (
          <span className={[styles.chevron, expanded ? styles.chevronOpen : ''].filter(Boolean).join(' ')} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </Tag>

      {hasChildren && expanded && variant === 'full' && (
        <ul className={styles.navList}>
          {item.children!.map((child) => (
            <NavItemRow key={child.id} item={child} activeId={activeId} onNavigate={onNavigate} variant={variant} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function SideNav({
  items,
  activeId,
  onNavigate,
  logo,
  footer,
  variant = 'full',
  theme = 'light',
  className,
}: SideNavProps) {
  return (
    <nav
      className={[styles.nav, styles[theme], styles[variant], className].filter(Boolean).join(' ')}
      aria-label="Side navigation"
    >
      {logo && <div className={styles.logoSlot}>{logo}</div>}

      <ul className={styles.navList} role="list">
        {items.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            activeId={activeId}
            onNavigate={onNavigate}
            variant={variant}
          />
        ))}
      </ul>

      {footer && <div className={styles.footerSlot}>{footer}</div>}
    </nav>
  );
}
