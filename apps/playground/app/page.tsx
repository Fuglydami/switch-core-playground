import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Switch Core — Playground' };

const QUICK_LINKS = [
  {
    href: 'https://github.com/Fuglydami/switch-core-playground/blob/main/DESIGN_SYSTEM.md',
    label: 'Vibe Coding Guide',
    description: 'Use AI to build UIs with Switch components',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L2 7l8 5 8-5-8-5z" fill="var(--switch-color-popblue)" />
        <path d="M2 13l8 5 8-5" stroke="var(--switch-color-popblue)" strokeWidth="1.5" fill="none" />
        <path d="M2 10l8 5 8-5" stroke="var(--switch-color-popblue)" strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>
    ),
    external: true,
  },
  {
    href: '/tokens/colors',
    label: 'Design Tokens',
    description: 'Colors, spacing, typography and shadows',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="4" fill="var(--switch-color-activeblue-400)" />
        <circle cx="14" cy="6" r="4" fill="var(--switch-color-primaryred-400)" />
        <circle cx="6" cy="14" r="4" fill="var(--switch-color-activegreen-400)" />
        <circle cx="14" cy="14" r="4" fill="var(--switch-color-activeyellow-400)" />
      </svg>
    ),
  },
  {
    href: '/components/button',
    label: 'Components',
    description: 'React component library with full API docs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="16" height="8" rx="3" stroke="var(--switch-color-action-primary-fill)" strokeWidth="1.5" />
        <path d="M7 10h6" stroke="var(--switch-color-action-primary-fill)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/guidelines/platforms',
    label: 'Guidelines',
    description: 'Platform targets, accessibility and patterns',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 5h12M4 10h8M4 15h10" stroke="var(--switch-color-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/changelog',
    label: 'Changelog',
    description: 'Version history and release notes',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="14" height="16" rx="2" stroke="var(--switch-color-text-secondary)" strokeWidth="1.5" />
        <path d="M7 7h6M7 11h4" stroke="var(--switch-color-text-secondary)" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
];

const PACKAGES = [
  { name: '@switch/react',        description: 'Web components (React DOM)',         status: 'stable' },
  { name: '@switch/react-native', description: 'Mobile components (React Native)',   status: 'stable' },
  { name: '@switch/tokens',       description: 'Design tokens (CSS, JS, Tailwind, RN)', status: 'stable' },
  { name: '@switch/icons',        description: 'SVG icon library (React + RN)',      status: 'beta'   },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: 760 }}>

      {/* Hero */}
      <div style={{ marginBottom: 48 }}>
        <p style={{
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--switch-color-action-primary-fill)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 12px',
        }}>
          Switch Core
        </p>
        <h1 style={{
          fontSize: 40,
          fontWeight: 700,
          color: 'var(--switch-color-text-primary)',
          margin: '0 0 16px',
          lineHeight: 1.15,
        }}>
          Playground Design System
        </h1>
        <p style={{
          fontSize: 17,
          color: 'var(--switch-color-text-secondary)',
          lineHeight: 1.65,
          maxWidth: 580,
          margin: 0,
        }}>
          The internal source of truth for UI components, design tokens, and usage
          guidelines for the Switch frontend team — covering web and mobile.
        </p>
      </div>

      {/* Quick links */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12,
        marginBottom: 48,
      }}>
        {QUICK_LINKS.map((link) => {
          const isExternal = 'external' in link && link.external;
          const LinkComponent = isExternal ? 'a' : Link;
          const linkProps = isExternal
            ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
            : { href: link.href };

          return (
            <LinkComponent key={link.href} {...linkProps} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '18px 20px',
                background: 'var(--switch-color-surface-primary)',
                borderRadius: 12,
                border: '1px solid var(--switch-color-border-default)',
                boxShadow: 'var(--switch-shadow-sm)',
                height: '100%',
                boxSizing: 'border-box',
              }}>
                <div style={{ marginBottom: 10 }}>{link.icon}</div>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--switch-color-text-primary)', margin: '0 0 4px' }}>
                  {link.label}
                  {isExternal && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4, verticalAlign: 'middle' }}>
                      <path d="M3.5 2.5h6v6M9 3L3 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </p>
                <p style={{ fontSize: 13, color: 'var(--switch-color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {link.description}
                </p>
              </div>
            </LinkComponent>
          );
        })}
      </div>

      {/* Packages */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--switch-color-text-primary)', margin: '0 0 16px' }}>
          Packages
        </h2>
        <div style={{
          background: 'var(--switch-color-surface-primary)',
          border: '1px solid var(--switch-color-border-default)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                borderBottom: i < PACKAGES.length - 1 ? '1px solid var(--switch-color-border-default)' : 'none',
                gap: 16,
              }}
            >
              <div>
                <code style={{
                  fontSize: 13,
                  fontFamily: 'var(--switch-typography-font-family-mono)',
                  color: 'var(--switch-color-action-primary-fill)',
                  display: 'block',
                  marginBottom: 2,
                }}>
                  {pkg.name}
                </code>
                <span style={{ fontSize: 13, color: 'var(--switch-color-text-secondary)' }}>
                  {pkg.description}
                </span>
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: 99,
                background: pkg.status === 'stable'
                  ? 'var(--switch-color-activegreen-100)'
                  : 'var(--switch-color-activeyellow-100)',
                color: pkg.status === 'stable'
                  ? 'var(--switch-color-activegreen-500)'
                  : 'var(--switch-color-activeyellow-500)',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
              }}>
                {pkg.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--switch-color-text-primary)', margin: '0 0 16px' }}>
          Quick Start
        </h2>
        <div style={{
          background: 'var(--switch-color-surface-primary)',
          border: '1px solid var(--switch-color-border-default)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid var(--switch-color-border-default)',
            background: 'var(--switch-color-surface-grey)',
          }}>
            <span style={{ fontSize: 12, color: 'var(--switch-color-text-secondary)', fontFamily: 'var(--switch-typography-font-family-mono)' }}>
              install + usage
            </span>
          </div>
          <pre style={{
            background: 'var(--switch-color-neutral-1000)',
            color: 'var(--switch-color-neutral-50)',
            padding: '20px 24px',
            fontSize: 13,
            fontFamily: 'var(--switch-typography-font-family-mono)',
            overflowX: 'auto',
            margin: 0,
            lineHeight: 1.7,
          }}>{`# Install packages
pnpm add @switch/react @switch/tokens

# In your app entry
import '@switch/tokens/css';

# Use components
import { Button, Input } from '@switch/react';

<Button variant="primary" colorScheme="activeBlue" onPress={() => {}}>
  Get started
</Button>`}</pre>
        </div>
      </section>

    </div>
  );
}
