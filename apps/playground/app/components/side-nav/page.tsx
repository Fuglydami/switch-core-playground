import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Side Nav' };

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

export default function SideNavPage() {
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
