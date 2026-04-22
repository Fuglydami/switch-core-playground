'use client';

import { useState } from 'react';
import { BottomNav } from '@switch/react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { BottomNav } from '@switch/react';

<BottomNav
  activeId="home"
  onSelect={(id) => setActiveTab(id)}
  variant="outline-fill"
  items={[
    { id: 'home', label: 'Home', icon: <HomeIcon />, activeIcon: <HomeFilledIcon /> },
    { id: 'search', label: 'Search', icon: <SearchIcon />, activeIcon: <SearchFilledIcon /> },
    { id: 'cart', label: 'Cart', icon: <CartIcon />, activeIcon: <CartFilledIcon />, badge: 3 },
    { id: 'profile', label: 'Profile', icon: <UserIcon />, activeIcon: <UserFilledIcon /> },
  ]}
/>`;

const RN_CODE = `import { BottomNav } from '@switch/react-native';

<BottomNav
  activeId="home"
  onSelect={(id) => navigation.navigate(id)}
  variant="outline-fill"
  items={[
    { id: 'home', label: 'Home', icon: <HomeIcon />, activeIcon: <HomeFilledIcon /> },
    { id: 'search', label: 'Search', icon: <SearchIcon />, activeIcon: <SearchFilledIcon /> },
    { id: 'cart', label: 'Cart', icon: <CartIcon />, activeIcon: <CartFilledIcon />, badge: 3 },
    { id: 'profile', label: 'Profile', icon: <UserIcon />, activeIcon: <UserFilledIcon /> },
  ]}
/>`;

const PROPS = [
  { name: 'items', type: 'BottomNavItem[]', required: true, description: 'Navigation items (3-5 recommended)' },
  { name: 'activeId', type: 'string', default: '—', description: 'Currently active item ID' },
  { name: 'onSelect', type: '(id: string) => void', default: '—', description: 'Called when an item is selected' },
  { name: 'variant', type: '"outline" | "fill" | "outline-fill"', default: '"outline-fill"', description: 'Icon style variant' },
  { name: 'className', type: 'string', default: '—', description: 'Additional CSS class' },
];

const ITEM_PROPS = [
  { name: 'id', type: 'string', required: true, description: 'Unique identifier' },
  { name: 'label', type: 'string', required: true, description: 'Display label below icon' },
  { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element (outline style)' },
  { name: 'activeIcon', type: 'React.ReactNode', default: '—', description: 'Filled icon for active state' },
  { name: 'badge', type: 'number | string', default: '—', description: 'Notification badge' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents selection' },
];

// Outline icons
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
  </svg>
);

// Filled icons
const HomeFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.1L2 9.5V21a1 1 0 001 1h6v-8h6v8h6a1 1 0 001-1V9.5L12 2.1z" />
  </svg>
);

const SearchFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2a9 9 0 106.32 15.49l4.1 4.1a1 1 0 001.41-1.42l-4.1-4.1A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
  </svg>
);

const HeartFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 11-8 0" />
  </svg>
);

const UserFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6H4z" />
  </svg>
);

export default function BottomNavPage() {
  const [outlineActive, setOutlineActive] = useState('home');
  const [fillActive, setFillActive] = useState('home');
  const [outlineFillActive, setOutlineFillActive] = useState('home');

  const items = [
    { id: 'home', label: 'Home', icon: <HomeIcon />, activeIcon: <HomeFilledIcon /> },
    { id: 'search', label: 'Search', icon: <SearchIcon />, activeIcon: <SearchFilledIcon /> },
    { id: 'favorites', label: 'Favorites', icon: <HeartIcon />, activeIcon: <HeartFilledIcon />, badge: 2 },
    { id: 'cart', label: 'Cart', icon: <CartIcon />, activeIcon: <CartFilledIcon /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon />, activeIcon: <UserFilledIcon /> },
  ];

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Bottom Nav</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Mobile tab bar navigation fixed at the bottom of the screen. Supports outline, fill, and
          outline-fill icon variants with optional notification badges.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Outline Variant">
          <div style={{ position: 'relative', height: 80, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#f9fafb' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <BottomNav
                items={items}
                activeId={outlineActive}
                onSelect={setOutlineActive}
                variant="outline"
              />
            </div>
          </div>
          <p style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
            Icons remain outlined even when active
          </p>
        </ComponentPreview>

        <ComponentPreview title="Fill Variant">
          <div style={{ position: 'relative', height: 80, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#f9fafb' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <BottomNav
                items={items}
                activeId={fillActive}
                onSelect={setFillActive}
                variant="fill"
              />
            </div>
          </div>
          <p style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
            Icons are always filled
          </p>
        </ComponentPreview>

        <ComponentPreview title="Outline-Fill Variant (Default)">
          <div style={{ position: 'relative', height: 80, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#f9fafb' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <BottomNav
                items={items}
                activeId={outlineFillActive}
                onSelect={setOutlineFillActive}
                variant="outline-fill"
              />
            </div>
          </div>
          <p style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
            Outlined when inactive, filled when active
          </p>
        </ComponentPreview>

        <ComponentPreview title="With Disabled Item">
          <div style={{ position: 'relative', height: 80, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#f9fafb' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <BottomNav
                items={[
                  ...items.slice(0, 3),
                  { ...items[3], disabled: true },
                  items[4],
                ]}
                activeId="home"
                onSelect={() => {}}
              />
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>BottomNav Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>BottomNavItem Shape</h2>
        <PropsTable props={ITEM_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: 'var(--switch-color-text-secondary)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Uses <code>role="tablist"</code> and <code>role="tab"</code> for proper semantics.</li>
          <li>Active tab has <code>aria-selected="true"</code>.</li>
          <li>Disabled items have <code>aria-disabled="true"</code>.</li>
          <li>Respects <code>safe-area-inset-bottom</code> for devices with home indicators.</li>
        </ul>
      </section>
    </article>
  );
}
