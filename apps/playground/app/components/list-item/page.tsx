'use client';

import { ListItem, Checkbox } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { ListItem, Checkbox, Switch } from 'switch-core-react';

// Label only
<ListItem variant="label" label="Account settings" />

// Label with avatar
<ListItem
  variant="label-avatar"
  label="Ngozi Adeyemi"
  sublabel="ngozi@example.com"
  avatar={{ initials: 'NA' }}
  onClick={() => router.push('/users/ngozi')}
/>

// Label with icon
<ListItem
  variant="label-icon"
  label="Security"
  sublabel="2FA, passwords, and sessions"
  leadingIcon={<ShieldIcon />}
  onClick={() => router.push('/settings/security')}
/>

// Label with control
<ListItem
  variant="label-control"
  label="Push notifications"
  sublabel="Receive alerts on your device"
  control={<Switch checked={enabled} onChange={setEnabled} />}
/>`;

const RN_CODE = `import { ListItem } from 'switch-core-react-native';

// Label only
<ListItem variant="label" label="Account settings" />

// Label with avatar
<ListItem
  variant="label-avatar"
  label="Ngozi Adeyemi"
  sublabel="ngozi@example.com"
  avatar={{ initials: 'NA' }}
  onClick={() => navigation.navigate('User', { id: 'ngozi' })}
/>

// Label with icon
<ListItem
  variant="label-icon"
  label="Security"
  sublabel="2FA, passwords, and sessions"
  leadingIcon={<ShieldIcon />}
  onClick={() => navigation.navigate('Security')}
/>`;

const PROPS = [
  { name: 'variant', type: "'label' | 'label-avatar' | 'label-icon' | 'label-control'", default: "'label'", description: 'Display variant determining which elements are shown' },
  { name: 'label', type: 'string', required: true, description: 'Primary label rendered in the row' },
  { name: 'sublabel', type: 'string', default: '—', description: 'Secondary text rendered below the label' },
  { name: 'avatar', type: '{ src?: string; initials: string }', default: '—', description: 'Avatar data for label-avatar variant' },
  { name: 'leadingIcon', type: 'React.ReactNode', default: '—', description: 'Icon for label-icon variant' },
  { name: 'control', type: 'React.ReactNode', default: '—', description: 'Control element (Switch, Checkbox) for label-control variant' },
  { name: 'onClick', type: '() => void', default: '—', description: 'When provided, renders as an interactive button' },
];

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2l6 2.5v4.5c0 4-2.5 6.5-6 8-3.5-1.5-6-4-6-8V4.5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a5 5 0 00-5 5v3l-1.5 2.5h13L15 10V7a5 5 0 00-5-5zM8.5 17.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 17c0-3 3-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function ListItemPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>ListItem</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          A flexible row component for menus, settings screens, and contact lists.
          Renders as a static element by default, or as a button when <code>onClick</code> is provided.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Label Only">
          <div style={{ width: '100%', background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <ListItem variant="label" label="Account settings" onClick={() => alert('Clicked')} />
            <ListItem variant="label" label="Privacy" onClick={() => alert('Clicked')} />
            <ListItem variant="label" label="Help & Support" onClick={() => alert('Clicked')} />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Label with Avatar">
          <div style={{ width: '100%', background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <ListItem
              variant="label-avatar"
              label="Ngozi Adeyemi"
              sublabel="ngozi@example.com"
              avatar={{ initials: 'NA' }}
              onClick={() => alert('Contact clicked')}
            />
            <ListItem
              variant="label-avatar"
              label="Chidi Okonkwo"
              sublabel="chidi@example.com"
              avatar={{ initials: 'CO' }}
              onClick={() => alert('Contact clicked')}
            />
            <ListItem
              variant="label-avatar"
              label="Aisha Mohammed"
              sublabel="aisha@example.com"
              avatar={{ initials: 'AM' }}
              onClick={() => alert('Contact clicked')}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Label with Icon">
          <div style={{ width: '100%', background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <ListItem
              variant="label-icon"
              label="Account"
              sublabel="Manage your profile"
              leadingIcon={<UserIcon />}
              onClick={() => {}}
            />
            <ListItem
              variant="label-icon"
              label="Security"
              sublabel="2FA and passwords"
              leadingIcon={<ShieldIcon />}
              onClick={() => {}}
            />
            <ListItem
              variant="label-icon"
              label="Notifications"
              sublabel="Email and push settings"
              leadingIcon={<BellIcon />}
              onClick={() => {}}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Label with Control">
          <div style={{ width: '100%', background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <ListItem
              variant="label-control"
              label="Push notifications"
              sublabel="Receive alerts on your device"
              control={<Checkbox />}
            />
            <ListItem
              variant="label-control"
              label="Email updates"
              sublabel="Weekly digest and promotions"
              control={<Checkbox />}
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

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Interactive rows render as <code>&lt;button&gt;</code> elements for keyboard accessibility.</li>
          <li>Static rows render as <code>&lt;div&gt;</code> elements.</li>
          <li>Control variants allow the control to maintain its own focus and interaction.</li>
        </ul>
      </section>
    </article>
  );
}
