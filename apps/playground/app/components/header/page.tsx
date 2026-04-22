'use client';

import { useState } from 'react';
import { Header, Button } from '@switch/react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Header, Button } from '@switch/react';

// Dashboard header with user profile
<Header
  logo={<Logo />}
  navItems={[
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
  ]}
  onNavClick={(id) => router.push(\`/\${id}\`)}
  notificationCount={5}
  onNotificationClick={() => openNotifications()}
  user={{
    name: 'Ada Okafor',
    designation: 'Product Manager',
    avatar: '/avatars/ada.jpg',
  }}
  userMenuItems={[
    { id: 'profile', label: 'My Profile', onClick: () => goToProfile() },
    { id: 'settings', label: 'Settings', onClick: () => goToSettings() },
    { id: 'logout', label: 'Log Out', onClick: () => logout() },
  ]}
/>

// Public header with auth buttons
<Header
  logo={<Logo />}
  navItems={[
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
  ]}
  actions={
    <>
      <Button variant="tertiary" size="small">Log In</Button>
      <Button variant="primary" size="small">Sign Up</Button>
    </>
  }
/>`;

const PROPS = [
  { name: 'logo', type: 'React.ReactNode', default: '—', description: 'Logo element displayed on the left' },
  { name: 'navItems', type: 'HeaderNavItem[]', default: '[]', description: 'Navigation items in the center' },
  { name: 'activeNavId', type: 'string', default: '—', description: 'Currently active nav item ID' },
  { name: 'onNavClick', type: '(id: string) => void', default: '—', description: 'Called when nav item is clicked' },
  { name: 'user', type: '{ name, designation?, avatar? }', default: '—', description: 'User profile display' },
  { name: 'userMenuItems', type: '{ id, label, onClick? }[]', default: '[]', description: 'Dropdown menu items for user' },
  { name: 'notificationCount', type: 'number', default: '—', description: 'Badge count on notification bell' },
  { name: 'onNotificationClick', type: '() => void', default: '—', description: 'Shows bell icon and handles click' },
  { name: 'actions', type: 'React.ReactNode', default: '—', description: 'Right-side action buttons' },
  { name: 'variant', type: '"light" | "dark"', default: '"light"', description: 'Color theme' },
  { name: 'className', type: 'string', default: '—', description: 'Additional CSS class' },
];

const NAV_ITEM_PROPS = [
  { name: 'id', type: 'string', required: true, description: 'Unique identifier' },
  { name: 'label', type: 'string', required: true, description: 'Display text' },
  { name: 'href', type: 'string', default: '—', description: 'Navigation URL' },
  { name: 'onClick', type: '() => void', default: '—', description: 'Click handler' },
  { name: 'hasDropdown', type: 'boolean', default: 'false', description: 'Shows dropdown chevron' },
  { name: 'active', type: 'boolean', default: 'false', description: 'Active state styling' },
];

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{ width: 32, height: 32, background: '#00425F', borderRadius: 6 }} />
    <span style={{ fontWeight: 700, fontSize: 18 }}>Switch</span>
  </div>
);

const LogoWhite = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{ width: 32, height: 32, background: '#ffffff', borderRadius: 6 }} />
    <span style={{ fontWeight: 700, fontSize: 18, color: '#ffffff' }}>Switch</span>
  </div>
);

export default function HeaderPage() {
  const [lightActiveNav, setLightActiveNav] = useState('dashboard');
  const [darkActiveNav, setDarkActiveNav] = useState('analytics');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings', hasDropdown: true },
  ];

  const userMenuItems = [
    { id: 'profile', label: 'My Profile', onClick: () => alert('Go to profile') },
    { id: 'settings', label: 'Settings', onClick: () => alert('Go to settings') },
    { id: 'logout', label: 'Log Out', onClick: () => alert('Logging out...') },
  ];

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Header</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Application header with logo, navigation, notifications, and user profile dropdown.
          Supports light and dark themes for dashboard and marketing pages.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Dashboard Header (Light)">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <Header
              logo={<Logo />}
              navItems={navItems.map(item => ({ ...item, active: item.id === lightActiveNav }))}
              onNavClick={setLightActiveNav}
              notificationCount={5}
              onNotificationClick={() => alert('Open notifications')}
              user={{
                name: 'Ada Okafor',
                designation: 'Product Manager',
              }}
              userMenuItems={userMenuItems}
              variant="light"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Dashboard Header (Dark)">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <Header
              logo={<LogoWhite />}
              navItems={navItems.map(item => ({ ...item, active: item.id === darkActiveNav }))}
              onNavClick={setDarkActiveNav}
              notificationCount={12}
              onNotificationClick={() => alert('Open notifications')}
              user={{
                name: 'Chidi Nwankwo',
                designation: 'Engineer',
              }}
              userMenuItems={userMenuItems}
              variant="dark"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Marketing Header (With Actions)">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <Header
              logo={<Logo />}
              navItems={[
                { id: 'features', label: 'Features' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'about', label: 'About' },
                { id: 'contact', label: 'Contact' },
              ]}
              actions={
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="tertiary" size="small">Log In</Button>
                  <Button variant="primary" size="small">Sign Up</Button>
                </div>
              }
              variant="light"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Minimal Header (Logo Only)">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <Header
              logo={<Logo />}
              variant="light"
            />
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Header Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>HeaderNavItem Shape</h2>
        <PropsTable props={NAV_ITEM_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: 'var(--switch-color-text-secondary)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Navigation uses <code>&lt;nav&gt;</code> with <code>aria-label="Main navigation"</code>.</li>
          <li>Active nav item has <code>aria-current="page"</code>.</li>
          <li>User menu button has <code>aria-expanded</code> and <code>aria-haspopup="menu"</code>.</li>
          <li>Notification bell includes unread count in <code>aria-label</code>.</li>
          <li>Dropdown menu uses proper <code>role="menu"</code> and <code>role="menuitem"</code>.</li>
        </ul>
      </section>
    </article>
  );
}
