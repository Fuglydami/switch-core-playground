import React from 'react';
import styles from './Menu.module.css';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  /** Nested sub-menu items */
  children?: MenuItem[];
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  /** Element that triggers the menu */
  trigger: React.ReactNode;
  /** Menu placement relative to trigger */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
}

function MenuItemRow({
  item,
  depth = 0,
}: {
  item: MenuItem;
  depth?: number;
}) {
  const [subOpen, setSubOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li
      className={styles.listItem}
      onMouseEnter={() => hasChildren && setSubOpen(true)}
      onMouseLeave={() => hasChildren && setSubOpen(false)}
    >
      <button
        type="button"
        disabled={item.disabled}
        className={[
          styles.item,
          item.danger ? styles.danger : '',
          item.disabled ? styles.itemDisabled : '',
          hasChildren ? styles.hasChildren : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => {
          if (!hasChildren) item.onClick?.();
        }}
        onFocus={() => hasChildren && setSubOpen(true)}
        onBlur={(e) => {
          if (hasChildren && !e.currentTarget.parentElement?.contains(e.relatedTarget)) {
            setSubOpen(false);
          }
        }}
        aria-haspopup={hasChildren ? 'menu' : undefined}
        aria-expanded={hasChildren ? subOpen : undefined}
      >
        {item.icon && (
          <span className={styles.itemIcon} aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span className={styles.itemLabel}>{item.label}</span>
        {item.shortcut && (
          <span className={styles.shortcut}>{item.shortcut}</span>
        )}
        {hasChildren && (
          <span className={styles.chevronRight} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </button>

      {hasChildren && subOpen && (
        <ul className={[styles.menu, styles.submenu].join(' ')} role="menu">
          {item.children!.map((child) => (
            <MenuItemRow key={child.id} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Menu({ items, trigger, placement = 'bottom-start', className }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((o) => !o);
          }
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </button>

      {open && (
        <ul
          role="menu"
          className={[styles.menu, styles[placement]].filter(Boolean).join(' ')}
        >
          {items.map((item) => (
            item.id === 'separator' ? (
              <li key={item.id} role="separator" className={styles.separator} />
            ) : (
              <MenuItemRow key={item.id} item={item} />
            )
          ))}
        </ul>
      )}
    </div>
  );
}
