'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Sidebar.module.css';

interface NavItem { href: string; label: string; badge?: string; badgeColor?: string }
interface NavSection { group: string; collapsible?: boolean; items: NavItem[] }

const NAV: NavSection[] = [
  {
    group: 'Getting Started',
    collapsible: false,
    items: [{ href: '/', label: 'Home' }],
  },
  {
    group: 'Tokens',
    collapsible: true,
    items: [
      { href: '/tokens/colors',     label: 'Colors' },
      { href: '/tokens/spacing',    label: 'Spacing' },
      { href: '/tokens/typography', label: 'Typography' },
    ],
  },
  {
    group: 'Components',
    collapsible: true,
    items: [
      { href: '/components/accordion',   label: 'Accordion' },
      { href: '/components/alert',       label: 'Alert' },
      { href: '/components/app-bar',     label: 'AppBar' },
      { href: '/components/avatar',      label: 'Avatar' },
      { href: '/components/bottom-nav',  label: 'BottomNav'},
      { href: '/components/breadcrumb',  label: 'Breadcrumb'},
      { href: '/components/button',      label: 'Button' },
      { href: '/components/card',        label: 'Card' },
      { href: '/components/chip',        label: 'Chip' },
      { href: '/components/controls',    label: 'Controls' },
      { href: '/components/date-picker', label: 'DatePicker' },
      { href: '/components/divider',     label: 'Divider' },
      { href: '/components/empty-state', label: 'EmptyState' },
      { href: '/components/header',      label: 'Header' },
      { href: '/components/helper-text', label: 'HelperText' },
      { href: '/components/input',       label: 'Input' },
      { href: '/components/list-item',   label: 'ListItem' },
      { href: '/components/loader',      label: 'Loader' },
      { href: '/components/menu',        label: 'Menu' },
      { href: '/components/modal',       label: 'Modal' },
      { href: '/components/side-nav',    label: 'SideNav' },
      { href: '/components/slider',      label: 'Slider' },
      { href: '/components/table',       label: 'Table' },
      { href: '/components/tabs',        label: 'Tabs' },
      { href: '/components/toast',       label: 'Toast' },
      { href: '/components/tooltip',     label: 'Tooltip' },
      { href: '/components/upload',      label: 'Upload' },
    ],
  },
  {
    group: 'Guidelines',
    collapsible: true,
    items: [
      { href: '/guidelines/platforms',     label: 'Platforms' },
      { href: '/guidelines/accessibility', label: 'Accessibility' },
    ],
  },
];

const RESOURCES = [
  { label: 'Figma Plugin', icon: '🎨', href: '#' },
  { label: 'Storybook',    icon: '📖', href: '#' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (group: string) =>
    setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }));

  const isOpen = (section: NavSection) =>
    !section.collapsible || !collapsed[section.group];

  return (
    <aside className={styles.sidebar} aria-label="Main navigation">
      <nav className={styles.nav}>
        {NAV.map((section) => {
          const open = isOpen(section);
          return (
            <div key={section.group}>
              <button
                type="button"
                className={styles.sectionHeader}
                data-static={String(!section.collapsible)}
                onClick={() => section.collapsible && toggle(section.group)}
                {...(section.collapsible ? { 'aria-expanded': open } : {})}
              >
                <span className={styles.sectionLabel}>{section.group}</span>
                {section.collapsible && (
                  <svg
                    className={styles.chevron}
                    data-open={String(open)}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              {open && (
                <ul className={styles.itemList}>
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <span
                              className={styles.badge}
                              style={{
                                '--badge-fg': item.badgeColor,
                                '--badge-bg': `${item.badgeColor}22`,
                                '--badge-border': `${item.badgeColor}44`,
                              } as React.CSSProperties}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {/* Resources */}
        <div>
          <p className={styles.resourcesLabel}>Resources</p>
          <ul className={styles.resourceList}>
            {RESOURCES.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceLink}
                >
                  <span className={styles.resourceLinkInner}>
                    <span className={styles.resourceIcon}>{r.icon}</span>
                    {r.label}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Need help card */}
      <div className={styles.helpCard}>
        <p className={styles.helpTitle}>Need help?</p>
        <p className={styles.helpBody}>
          Browse the contributing guide or open a GitHub discussion.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.helpLink}
        >
          View on GitHub
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <path d="M1 10L10 1M10 1H4.5M10 1v5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
