import type { Metadata } from 'next';
import Link from 'next/link';
import { PlatformBadge } from '@/components/PlatformBadge';

export const metadata: Metadata = { title: 'Components' };

const COMPONENTS = [
  { href: '/components/button',    name: 'Button',      platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/input',     name: 'Input',       platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/modal',     name: 'Modal',       platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/toast',     name: 'Toast',       platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/tabs',      name: 'Tabs',        platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/list-item', name: 'List Item',   platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/tooltip',   name: 'Tooltip',     platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/helper-text', name: 'HelperText', platforms: ['ios', 'android'] as const,      status: 'stable' },
  { href: '/components/date-picker', name: 'DatePicker', platforms: ['web', 'ios', 'android'] as const, status: 'planned' },
  { href: '/components/accordion',   name: 'Accordion',          platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/table',       name: 'Table',              platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/upload',      name: 'Upload',             platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/chip',        name: 'Chip',               platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/controls',    name: 'Controls & Switches', platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/avatar',      name: 'Avatar',             platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/alert',       name: 'Alert',              platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/loader',      name: 'Loader',             platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/menu',        name: 'Menu',               platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/slider',      name: 'Slider',             platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/divider',     name: 'Divider',            platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/empty-state', name: 'Empty State',        platforms: ['web', 'ios', 'android'] as const, status: 'stable' },
  { href: '/components/side-nav',    name: 'Side Nav',           platforms: ['web'] as const,                  status: 'stable' },
  { href: '/components/card',        name: 'Card',               platforms: ['web'] as const,                  status: 'stable' },
];

export default function ComponentsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Components</h1>
      <p style={{ color: '#6b7280', margin: '0 0 32px' }}>
        All Switch Core components with platform availability. Components share the same prop API across web and React Native.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {COMPONENTS.map((c) => (
          <Link key={c.href} href={c.href} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: 16,
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              cursor: 'pointer',
              opacity: c.status === 'planned' ? 0.6 : 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{c.name}</p>
                {c.status === 'planned' && (
                  <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: 9999, fontWeight: 500 }}>
                    Planned
                  </span>
                )}
              </div>
              <PlatformBadge platforms={c.platforms} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
