'use client';

import { EmptyState, Button } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { EmptyState } from 'switch-core-react';

// With default placeholder illustration
<EmptyState
  title="No transactions yet"
  description="Your history will appear here after your first payment."
  action={<Button>Make a payment</Button>}
/>

// With custom illustration
<EmptyState
  illustration={<img src="/empty-inbox.svg" width={96} height={96} alt="" />}
  title="Your inbox is empty"
  description="New notifications will appear here."
  action={<Button variant="secondary">Refresh</Button>}
  secondaryAction={<a href="/settings">Notification settings</a>}
/>`;

const RN_CODE = `import { EmptyState } from 'switch-core-react-native';
import { Button } from 'switch-core-react-native';
import { Image } from 'react-native';

// With default placeholder illustration
<EmptyState
  title="No transactions yet"
  description="Your history will appear here after your first payment."
  action={<Button onPress={handlePayment}>Make a payment</Button>}
/>

// With custom illustration
<EmptyState
  illustration={<Image source={require('./empty-inbox.png')} style={{ width: 96, height: 96 }} />}
  title="Your inbox is empty"
  description="New notifications will appear here."
  action={<Button variant="secondary" onPress={refresh}>Refresh</Button>}
/>`;

const PROPS = [
  { name: 'title',           type: 'string',          required: true,  description: 'Primary heading shown below the illustration' },
  { name: 'illustration',    type: 'React.ReactNode',  default: '(default SVG)', description: 'Illustration, image, or icon — defaults to a generic placeholder' },
  { name: 'description',     type: 'string',           default: '—',   description: 'Supporting text below the title (max-width capped at 360px)' },
  { name: 'action',          type: 'React.ReactNode',  default: '—',   description: 'Primary CTA (typically a Button)' },
  { name: 'secondaryAction', type: 'React.ReactNode',  default: '—',   description: 'Secondary CTA (link, ghost button, etc.)' },
  { name: 'className',       type: 'string',           default: '—',   description: 'Extra class on the wrapper' },
];

const InboxIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="16" width="48" height="36" rx="4" stroke="#D1D5DB" strokeWidth="2" />
    <path d="M8 28h16l4 8h8l4-8h16" stroke="#D1D5DB" strokeWidth="2" />
    <circle cx="32" cy="40" r="4" fill="#E5E7EB" />
  </svg>
);

const SearchIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="28" cy="28" r="16" stroke="#D1D5DB" strokeWidth="2" />
    <path d="M40 40l12 12" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 28h12M28 22v12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FileIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M16 8h24l12 12v36a4 4 0 01-4 4H16a4 4 0 01-4-4V12a4 4 0 014-4z" stroke="#D1D5DB" strokeWidth="2" />
    <path d="M40 8v12h12" stroke="#D1D5DB" strokeWidth="2" />
    <path d="M24 32h16M24 40h12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function EmptyStatePage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Empty State</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Placeholder shown when a list, table, or view has no content. Accepts a custom illustration, a title, a description, and up to two action slots.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Default">
          <div style={{ width: '100%', padding: '40px 0' }}>
            <EmptyState
              title="No transactions yet"
              description="Your history will appear here after your first payment."
              action={<Button>Make a payment</Button>}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Custom Illustration">
          <div style={{ width: '100%', padding: '40px 0' }}>
            <EmptyState
              illustration={<InboxIcon />}
              title="Your inbox is empty"
              description="New notifications will appear here when you receive them."
              action={<Button variant="secondary">Refresh</Button>}
              secondaryAction={
                <a href="#" style={{ color: 'var(--switch-color-semantic-interactive)', fontSize: 14 }}>
                  Notification settings
                </a>
              }
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Search Results">
          <div style={{ width: '100%', padding: '40px 0' }}>
            <EmptyState
              illustration={<SearchIcon />}
              title="No results found"
              description="Try adjusting your search or filters to find what you're looking for."
              action={<Button variant="outline">Clear filters</Button>}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="No Documents">
          <div style={{ width: '100%', padding: '40px 0' }}>
            <EmptyState
              illustration={<FileIcon />}
              title="No documents"
              description="Upload your first document to get started."
              action={<Button>Upload document</Button>}
            />
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </article>
  );
}
