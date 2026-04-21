import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Empty State' };

const WEB_CODE = `import { EmptyState } from '@switch/react';

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

const RN_CODE = `import { EmptyState } from '@switch/react-native';
import { Button } from '@switch/react-native';
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
