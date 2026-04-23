'use client';

import { AppBar, AppBarAction } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview, PreviewItem } from '@/components/ComponentPreview';

const WEB_CODE = `import { AppBar, AppBarAction } from 'switch-core-react';

// Basic with back button
<AppBar
  title="Settings"
  showBack
  onBack={() => router.back()}
/>

// With trailing actions
<AppBar
  title="Messages"
  showBack
  onBack={() => router.back()}
  trailing={
    <>
      <AppBarAction icon={<SearchIcon />} label="Search" onClick={openSearch} />
      <AppBarAction icon={<MoreIcon />} label="More options" onClick={openMenu} />
    </>
  }
/>

// Large title with label
<AppBar
  size="large"
  label="Welcome back"
  title="Dashboard"
  subtitle="Last updated 5 min ago"
/>`;

const RN_CODE = `import { AppBar, AppBarAction } from 'switch-core-react-native';

// Basic with back button
<AppBar
  title="Settings"
  showBack
  onBack={() => navigation.goBack()}
/>

// With trailing actions
<AppBar
  title="Messages"
  showBack
  onBack={() => navigation.goBack()}
  trailing={
    <>
      <AppBarAction icon={<SearchIcon />} label="Search" onPress={openSearch} />
      <AppBarAction icon={<MoreIcon />} label="More options" onPress={openMenu} />
    </>
  }
/>

// Large title with subtitle
<AppBar
  size="large"
  title="Dashboard"
  subtitle="Last updated 5 min ago"
  titleAlign="left"
/>`;

const PROPS = [
  { name: 'title', type: 'string', default: '—', description: 'Screen title' },
  { name: 'subtitle', type: 'string', default: '—', description: 'Secondary text below title' },
  { name: 'label', type: 'string', default: '—', description: 'Small label above title' },
  { name: 'leading', type: 'React.ReactNode', default: '—', description: 'Left element (overrides back button)' },
  { name: 'trailing', type: 'React.ReactNode', default: '—', description: 'Right element(s) for actions' },
  { name: 'showBack', type: 'boolean', default: 'false', description: 'Show default back arrow' },
  { name: 'onBack', type: '() => void', default: '—', description: 'Called when back button is pressed' },
  { name: 'titleAlign', type: '"left" | "center"', default: '"center"', description: 'Title text alignment' },
  { name: 'size', type: '"default" | "large"', default: '"default"', description: 'Height and title size' },
  { name: 'variant', type: '"light" | "dark"', default: '"light"', description: 'Color theme' },
  { name: 'className', type: 'string', default: '—', description: 'Additional CSS class' },
];

const ACTION_PROPS = [
  { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element' },
  { name: 'label', type: 'string', required: true, description: 'Accessible label' },
  { name: 'onClick', type: '() => void', default: '—', description: 'Click handler' },
  { name: 'badge', type: 'number | string', default: '—', description: 'Notification badge' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the action' },
];

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3a6 6 0 00-6 6v4l-2 3h16l-2-3V9a6 6 0 00-6-6zM10.5 21a1.5 1.5 0 003 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AppBarPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>AppBar</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Mobile-style navigation bar for screen headers. Supports back navigation, title with
          optional label/subtitle, action buttons, and light/dark themes.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Basic with Back Button">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <AppBar
              title="Settings"
              showBack
              onBack={() => alert('Go back')}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Trailing Actions">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <AppBar
              title="Messages"
              showBack
              onBack={() => alert('Go back')}
              trailing={
                <>
                  <AppBarAction icon={<SearchIcon />} label="Search" onClick={() => alert('Search')} />
                  <AppBarAction icon={<MoreIcon />} label="More" onClick={() => alert('More options')} />
                </>
              }
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Badge">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <AppBar
              title="Notifications"
              showBack
              onBack={() => alert('Go back')}
              trailing={
                <AppBarAction icon={<BellIcon />} label="Notifications" badge={5} onClick={() => alert('Notifications')} />
              }
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Large Size with Label">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <AppBar
              size="large"
              label="Welcome back"
              title="Dashboard"
              subtitle="Last updated 5 min ago"
              titleAlign="left"
              trailing={
                <AppBarAction icon={<BellIcon />} label="Notifications" badge={3} onClick={() => alert('Notifications')} />
              }
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Title Alignment">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <PreviewItem label="Center (Default)">
              <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                <AppBar
                  title="Centered Title"
                  showBack
                  onBack={() => {}}
                  titleAlign="center"
                  trailing={<AppBarAction icon={<ShareIcon />} label="Share" />}
                />
              </div>
            </PreviewItem>
            <PreviewItem label="Left">
              <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                <AppBar
                  title="Left Aligned"
                  showBack
                  onBack={() => {}}
                  titleAlign="left"
                  trailing={<AppBarAction icon={<ShareIcon />} label="Share" />}
                />
              </div>
            </PreviewItem>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Dark Variant">
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <AppBar
              title="Dark AppBar"
              showBack
              onBack={() => alert('Go back')}
              variant="dark"
              trailing={
                <>
                  <AppBarAction icon={<SearchIcon />} label="Search" onClick={() => alert('Search')} />
                  <AppBarAction icon={<MoreIcon />} label="More" onClick={() => alert('More options')} />
                </>
              }
            />
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>AppBar Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>AppBarAction Props</h2>
        <PropsTable props={ACTION_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: 'var(--switch-color-text-secondary)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Uses semantic <code>&lt;header&gt;</code> element.</li>
          <li>Back button has <code>aria-label="Go back"</code>.</li>
          <li>Action buttons include descriptive <code>aria-label</code> props.</li>
          <li>Title uses <code>&lt;h1&gt;</code> for proper heading hierarchy.</li>
          <li>Respects <code>safe-area-inset-top</code> for devices with notches.</li>
        </ul>
      </section>
    </article>
  );
}
