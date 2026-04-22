import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';

export interface HeaderNavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  hasDropdown?: boolean;
  active?: boolean;
}

export interface HeaderProps {
  logo?: React.ReactNode;
  navItems?: HeaderNavItem[];
  activeNavId?: string;
  onNavClick?: (id: string) => void;
  user?: {
    name: string;
    designation?: string;
    avatar?: string | React.ReactNode;
  };
  userMenuItems?: { id: string; label: string; onClick?: () => void }[];
  notificationCount?: number;
  onNotificationClick?: () => void;
  actions?: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a5 5 0 00-5 5v3l-1.5 2.5h13L15 10V7a5 5 0 00-5-5zM8.5 17.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  logo,
  navItems = [],
  activeNavId,
  onNavClick,
  user,
  userMenuItems = [],
  notificationCount,
  onNotificationClick,
  actions,
  variant = 'light',
  className = '',
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderAvatar = () => {
    if (!user) return null;
    if (typeof user.avatar === 'string') {
      return <img src={user.avatar} alt={user.name} className={styles.avatarImg} />;
    }
    if (user.avatar) {
      return user.avatar;
    }
    const initials = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    return <span className={styles.avatarInitials}>{initials}</span>;
  };

  return (
    <header className={`${styles.header} ${styles[variant]} ${className}`}>
      <div className={styles.content}>
        {logo && <div className={styles.logo}>{logo}</div>}

        {navItems.length > 0 && (
          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = item.active || item.id === activeNavId;
              const NavElement = item.href ? 'a' : 'button';
              const navProps = item.href ? { href: item.href } : { type: 'button' as const };

              return (
                <NavElement
                  key={item.id}
                  {...navProps}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  onClick={(e: React.MouseEvent) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                    onNavClick?.(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDownIcon />}
                </NavElement>
              );
            })}
          </nav>
        )}

        <div className={styles.right}>
          {actions && <div className={styles.actions}>{actions}</div>}

          {onNotificationClick && (
            <button
              type="button"
              className={styles.notification}
              onClick={onNotificationClick}
              aria-label={`Notifications${notificationCount ? ` (${notificationCount} unread)` : ''}`}
            >
              <BellIcon />
              {notificationCount !== undefined && notificationCount > 0 && (
                <span className={styles.notificationBadge}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
          )}

          {user && (
            <div className={styles.user} ref={userMenuRef}>
              <button
                type="button"
                className={styles.userButton}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                <div className={styles.avatar}>{renderAvatar()}</div>
                {user.name && (
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    {user.designation && (
                      <span className={styles.userDesignation}>{user.designation}</span>
                    )}
                  </div>
                )}
                <ChevronDownIcon />
              </button>

              {userMenuOpen && userMenuItems.length > 0 && (
                <div className={styles.userMenu} role="menu">
                  {userMenuItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitem"
                      className={styles.userMenuItem}
                      onClick={() => {
                        item.onClick?.();
                        setUserMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
