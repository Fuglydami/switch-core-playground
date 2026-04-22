'use client';

import { useState } from 'react';
import { SideNav } from '@switch/react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview, PreviewItem } from '@/components/ComponentPreview';

const WEB_CODE = `import { SideNav } from '@switch/react';

<SideNav
  theme="light"       // or "dark"
  variant="full"      // or "compact" (icon-only)
  activeId="dashboard"
  onNavigate={(id) => router.push(\`/\${id}\`)}
  logo={<Logo />}
  footer={
    <div style={{ display: 'flex', gap: 8 }}>
      <span>Support</span>
      <span>FAQ</span>
    </div>
  }
  items={[
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon />, href: '/dashboard' },
    { id: 'reports',   label: 'Reports',   icon: <ChartIcon />, badge: 3 },
    {
      id: 'settings', label: 'Settings', icon: <GearIcon />,
      children: [
        { id: 'account',  label: 'Account' },
        { id: 'security', label: 'Security' },
      ],
    },
    { id: 'help', label: 'Help', icon: <HelpIcon />, disabled: true },
  ]}
/>`;

const RN_CODE = `import { SideNav } from '@switch/react-native';
import { View, Text } from 'react-native';

<SideNav
  theme="light"       // or "dark"
  variant="full"      // or "compact" (icon-only)
  activeId="dashboard"
  onNavigate={(id) => navigation.navigate(id)}
  logo={<Logo />}
  footer={
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Text>Support</Text>
      <Text>FAQ</Text>
    </View>
  }
  items={[
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'reports',   label: 'Reports',   icon: <ChartIcon />, badge: 3 },
    {
      id: 'settings', label: 'Settings', icon: <GearIcon />,
      children: [
        { id: 'account',  label: 'Account' },
        { id: 'security', label: 'Security' },
      ],
    },
    { id: 'help', label: 'Help', icon: <HelpIcon />, disabled: true },
  ]}
/>

// Note: RN SideNav uses ScrollView for the nav items list.
// href is web-only — use onNavigate callback for RN navigation.`;

const SIDENAV_PROPS = [
  { name: 'items',      type: 'NavItem[]',                      required: true,  description: 'Navigation item definitions' },
  { name: 'activeId',   type: 'string',                         default: '—',    description: 'ID of the currently active item' },
  { name: 'onNavigate', type: '(id: string) => void',           default: '—',    description: 'Called when a nav item is clicked' },
  { name: 'logo',       type: 'React.ReactNode',                default: '—',    description: 'Brand logo rendered at the top of the nav' },
  { name: 'footer',     type: 'React.ReactNode',                default: '—',    description: 'Content pinned to the bottom (e.g. Support / FAQ links)' },
  { name: 'variant',    type: '"full" | "compact"',             default: '"full"', description: '"full" shows icon + label; "compact" shows icon only (240px vs 56px width)' },
  { name: 'theme',      type: '"light" | "dark"',               default: '"light"', description: 'Light (white bg) or dark (navy bg) colour scheme' },
];

const NAVITEM_PROPS = [
  { name: 'id',       type: 'string',         required: true,  description: 'Unique identifier used to match activeId' },
  { name: 'label',    type: 'string',         required: true,  description: 'Displayed text (hidden in compact variant)' },
  { name: 'icon',     type: 'React.ReactNode', default: '—',   description: 'Leading icon' },
  { name: 'href',     type: 'string',         default: '—',    description: 'Renders an anchor when provided; otherwise a button' },
  { name: 'badge',    type: 'string | number', default: '—',   description: 'Notification badge (hidden in compact variant)' },
  { name: 'disabled', type: 'boolean',        default: 'false', description: 'Prevents navigation' },
  { name: 'children', type: 'NavItem[]',      default: '—',    description: 'Nested sub-nav items — expanded when item is active or clicked' },
];

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 8l7-5 7 5v9a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 17V10M8 17V6M13 17V8M18 17V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 7.5a2.5 2.5 0 014.5 1.5c0 1.5-2.5 2-2.5 3.5M10 15h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 17c0-2.5 2-4 5-4s5 1.5 5 4M13 13c2 0 4 1 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{ width: 28, height: 28, background: 'var(--switch-color-brand-primary, #00425F)', borderRadius: 6 }} />
    <span style={{ fontWeight: 700, fontSize: 16 }}>Switch</span>
  </div>
);

const LogoCompact = () => (
  <div style={{ width: 28, height: 28, background: 'var(--switch-color-brand-primary, #00425F)', borderRadius: 6 }} />
);

export default function SideNavPage() {
  const [lightActiveId, setLightActiveId] = useState('dashboard');
  const [darkActiveId, setDarkActiveId] = useState('reports');
  const [compactActiveId, setCompactActiveId] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'reports', label: 'Reports', icon: <ChartIcon />, badge: 3 },
    { id: 'users', label: 'Users', icon: <UsersIcon /> },
    {
      id: 'settings',
      label: 'Settings',
      icon: <GearIcon />,
      children: [
        { id: 'account', label: 'Account' },
        { id: 'security', label: 'Security' },
        { id: 'billing', label: 'Billing' },
      ],
    },
    { id: 'help', label: 'Help', icon: <HelpIcon />, disabled: true },
  ];

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Side Nav</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Sidebar navigation with light and dark themes, full and icon-only (compact) variants, active state indicator, badge counts, nested sub-items, and logo / footer slots.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Light Theme (Full)">
          <div style={{ height: 400, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <SideNav
              theme="light"
              variant="full"
              activeId={lightActiveId}
              onNavigate={setLightActiveId}
              logo={<Logo />}
              footer={
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  <a href="#" style={{ color: 'inherit', marginRight: 12 }}>Support</a>
                  <a href="#" style={{ color: 'inherit' }}>FAQ</a>
                </div>
              }
              items={navItems}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Dark Theme (Full)">
          <div style={{ height: 400, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <SideNav
              theme="dark"
              variant="full"
              activeId={darkActiveId}
              onNavigate={setDarkActiveId}
              logo={<Logo />}
              footer={
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                  <a href="#" style={{ color: 'inherit', marginRight: 12 }}>Support</a>
                  <a href="#" style={{ color: 'inherit' }}>FAQ</a>
                </div>
              }
              items={navItems}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Compact Variant (Icon Only)">
          <div style={{ display: 'flex', gap: 24 }}>
            <PreviewItem label="Light">
              <div style={{ height: 300, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                <SideNav
                  theme="light"
                  variant="compact"
                  activeId={compactActiveId}
                  onNavigate={setCompactActiveId}
                  logo={<LogoCompact />}
                  items={navItems}
                />
              </div>
            </PreviewItem>
            <PreviewItem label="Dark">
              <div style={{ height: 300, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                <SideNav
                  theme="dark"
                  variant="compact"
                  activeId={compactActiveId}
                  onNavigate={setCompactActiveId}
                  logo={<LogoCompact />}
                  items={navItems}
                />
              </div>
            </PreviewItem>
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>SideNav Props</h2>
        <PropsTable props={SIDENAV_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>NavItem Shape</h2>
        <PropsTable props={NAVITEM_PROPS} />
      </section>
    </article>
  );
}
