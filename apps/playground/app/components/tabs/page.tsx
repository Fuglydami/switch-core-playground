'use client';

import { useState } from 'react';
import { Tabs } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Tabs } from 'switch-core-react';

const items = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity', badge: 3 },
  { id: 'settings', label: 'Settings' },
];

function Example() {
  const [active, setActive] = useState('overview');

  return (
    <>
      <Tabs
        items={items}
        activeId={active}
        onChange={setActive}
      />
      {active === 'overview' && <OverviewPanel />}
      {active === 'activity' && <ActivityPanel />}
      {active === 'settings' && <SettingsPanel />}
    </>
  );
}

// With icons (icon-label variant)
const iconItems = [
  { id: 'home',    label: 'Home',    icon: <HomeIcon /> },
  { id: 'search',  label: 'Search',  icon: <SearchIcon /> },
  { id: 'profile', label: 'Profile', icon: <UserIcon /> },
];
<Tabs items={iconItems} activeId={active} onChange={setActive} variant="icon-label" />

// Pill variant
<Tabs items={items} activeId={active} onChange={setActive} variant="pill" />`;

const RN_CODE = `import { Tabs } from 'switch-core-react-native';

const items = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity', badge: 3 },
  { id: 'settings', label: 'Settings' },
];

function Example() {
  const [active, setActive] = useState('overview');

  return (
    <View>
      <Tabs
        items={items}
        activeId={active}
        onChange={setActive}
      />
      {active === 'overview' && <OverviewPanel />}
      {active === 'activity' && <ActivityPanel />}
      {active === 'settings' && <SettingsPanel />}
    </View>
  );
}

// Pill variant
<Tabs items={items} activeId={active} onChange={setActive} variant="pill" />`;

const PROPS = [
  { name: 'items',    type: 'Array<{ id: string; label: string; icon?: ReactNode; badge?: string | number; disabled?: boolean }>', required: true,  description: 'Tab definitions. Each tab must have a unique id.' },
  { name: 'activeId', type: 'string',              required: true,  description: 'id of the currently selected tab' },
  { name: 'onChange', type: '(id: string) => void', required: true,  description: 'Called when the user selects a different tab' },
  { name: 'variant',  type: "'underline' | 'icon-label' | 'pill'", default: "'underline'", description: 'Visual style. underline shows blue underline on active. icon-label shows icon to the left of label. pill renders capsule buttons.' },
];

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 6l6-4 6 4v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 15V9h4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 14c0-2.5 2.5-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function TabsPage() {
  const [activeUnderline, setActiveUnderline] = useState('overview');
  const [activeIconLabel, setActiveIconLabel] = useState('home');
  const [activePill, setActivePill] = useState('overview');
  const [activeBadge, setActiveBadge] = useState('activity');

  const basicItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity' },
    { id: 'settings', label: 'Settings' },
  ];

  const badgeItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity', badge: 3 },
    { id: 'settings', label: 'Settings', badge: 12 },
  ];

  const iconItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'search', label: 'Search', icon: <SearchIcon /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon /> },
  ];

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Tabs</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Horizontal navigation between related views. Supports default underline, icon-leading,
          and pill variants.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Underline Variant (Default)">
          <div style={{ width: '100%' }}>
            <Tabs
              items={basicItems}
              activeId={activeUnderline}
              onChange={setActiveUnderline}
              variant="underline"
            />
            <div style={{ padding: '16px 0', color: '#374151' }}>
              Active tab: <strong>{activeUnderline}</strong>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Badges">
          <div style={{ width: '100%' }}>
            <Tabs
              items={badgeItems}
              activeId={activeBadge}
              onChange={setActiveBadge}
              variant="underline"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Icon-Label Variant">
          <div style={{ width: '100%' }}>
            <Tabs
              items={iconItems}
              activeId={activeIconLabel}
              onChange={setActiveIconLabel}
              variant="icon-label"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Pill Variant">
          <div style={{ width: '100%' }}>
            <Tabs
              items={basicItems}
              activeId={activePill}
              onChange={setActivePill}
              variant="pill"
            />
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Platform Notes</h2>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Note platform="Web" color="#00425F" bg="rgba(0,66,95,0.06)">
            Keyboard navigation: <kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd> move focus between tabs,{' '}
            <kbd>Home</kbd> / <kbd>End</kbd> jump to first / last. Uses <code>role="tablist"</code> and{' '}
            <code>role="tab"</code> with <code>aria-selected</code>.
          </Note>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Default and icon-leading variants render inside a horizontal <code>ScrollView</code> so tabs can
            overflow on small screens. The pill variant renders as a <code>View</code> with{' '}
            <code>flexDirection: 'row'</code> and equal-width flex children.
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> <code>role="tablist"</code> on the container, <code>role="tab"</code> on each item, <code>aria-selected</code> reflects active state. Full keyboard support per ARIA authoring practices.</li>
          <li><strong>iOS (VoiceOver):</strong> Each tab is a <code>Pressable</code> with <code>accessibilityRole="tab"</code> and <code>accessibilityState.selected</code>.</li>
          <li><strong>Android (TalkBack):</strong> Same as iOS. The active tab announces "selected" state via <code>accessibilityState</code>.</li>
        </ul>
      </section>
    </article>
  );
}

function Note({ platform, color, bg, children }: { platform: string; color: string; bg: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, borderRadius: 4, padding: '10px 14px' }}>
      <span style={{ fontSize: 12, fontWeight: 700, color, marginRight: 8 }}>{platform}</span>
      <span style={{ fontSize: 14, color: '#374151' }}>{children}</span>
    </div>
  );
}
