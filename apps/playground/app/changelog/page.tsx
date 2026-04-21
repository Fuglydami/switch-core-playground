import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Changelog' };

export default function ChangelogPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Changelog</h1>
      <p style={{ color: '#6b7280', margin: '0 0 40px' }}>
        Version history for all <code>@switch/*</code> packages.
      </p>

      <div style={{ borderLeft: '2px solid #e5e7eb', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Entry version="0.1.0" date="April 2026" badge="In Development">
          <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.8, fontSize: 14, color: '#374151' }}>
            <li>Initial release — monorepo scaffold with Turborepo + pnpm workspaces</li>
            <li><strong>@switch/tokens</strong> — CSS, JS, Tailwind, and React Native token outputs via Style Dictionary 5</li>
            <li><strong>@switch/types</strong> — shared TypeScript interfaces with <code>onPress</code> API parity; AlertVariant, UploadStatus, SortDirection exports</li>
            <li>
              <strong>@switch/react</strong> — 22 components:
              <ul style={{ paddingLeft: 16, marginTop: 4, lineHeight: 1.6 }}>
                <li>Forms: Button, Input, Checkbox, Radio, Toggle, Slider, DatePicker</li>
                <li>Feedback: Alert, Toast, Loader (RingLoader, ProgressBar, StepProgress)</li>
                <li>Overlays: Modal, Tooltip, Menu</li>
                <li>Navigation: Tabs, SideNav, Accordion</li>
                <li>Data: Table, ListItem, Card, Chip, Avatar, AvatarGroup</li>
                <li>Layout: Divider, EmptyState, Upload</li>
              </ul>
            </li>
            <li>
              <strong>@switch/react-native</strong> — 12 components:
              <ul style={{ paddingLeft: 16, marginTop: 4, lineHeight: 1.6 }}>
                <li>Forms: Button, Input, Checkbox, Radio, Toggle, DatePicker</li>
                <li>Feedback: Toast, Loader (RingLoader, ProgressBar, StepProgress)</li>
                <li>Overlays: Modal</li>
                <li>Navigation: Tabs, ListItem</li>
                <li>Data: Avatar, AvatarGroup</li>
                <li>Layout: EmptyState, HelperText</li>
              </ul>
            </li>
            <li>Storybook 8 with visual regression via Chromatic</li>
            <li>Figma Code Connect for web and React Native</li>
            <li>Playground docs site (this site) with web + RN code tabs on every component page</li>
            <li>Full test coverage: 189 web tests, 87 React Native tests</li>
          </ul>
        </Entry>
      </div>
    </div>
  );
}

function Entry({
  version, date, badge, children,
}: {
  version: string;
  date: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        left: -32,
        top: 6,
        width: 12,
        height: 12,
        borderRadius: 6,
        background: 'var(--switch-color-semantic-interactive)',
        border: '2px solid #fff',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>v{version}</h2>
        <span style={{ fontSize: 13, color: '#9ca3af' }}>{date}</span>
        {badge && (
          <span style={{ fontSize: 11, background: 'rgba(0,184,222,0.1)', color: 'var(--switch-color-semantic-interactive)', padding: '2px 8px', borderRadius: 9999, fontWeight: 600 }}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
