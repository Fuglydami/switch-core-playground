'use client';

import { useState } from 'react';
import { Alert } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Alert } from 'switch-core-react';

<Alert variant="info">This is an informational message.</Alert>

<Alert variant="success">Your changes have been saved successfully.</Alert>

<Alert variant="warning">Your session will expire in 5 minutes.</Alert>

<Alert variant="danger">Failed to process your request. Please try again.</Alert>

<Alert
  variant="danger"
  title="Payment failed"
  dismissible
  onDismiss={() => setVisible(false)}
>
  Your card was declined. Please check your payment details.
</Alert>`;

const RN_CODE = `import { Alert } from 'switch-core-react-native';

<Alert variant="success">Your payment was processed successfully.</Alert>

<Alert
  variant="danger"
  title="Payment failed"
  dismissible
  onDismiss={() => setVisible(false)}
>
  Your card was declined. Please check your payment details.
</Alert>`;

const PROPS = [
  { name: 'variant',     type: '"info" | "success" | "warning" | "danger" | "primary" | "secondary"', default: '"info"', description: 'Visual style — controls colour and default icon' },
  { name: 'children',   type: 'React.ReactNode',  required: true, description: 'Alert body content' },
  { name: 'title',      type: 'string',           default: '—',    description: 'Optional bold title rendered above the body' },
  { name: 'dismissible', type: 'boolean',         default: 'false', description: 'Show dismiss (×) button in the top-right corner' },
  { name: 'onDismiss',  type: '() => void',       default: '—',    description: 'Called when dismiss button is clicked' },
  { name: 'icon',       type: 'React.ReactNode',  default: '—',    description: 'Custom leading icon (overrides the default variant icon)' },
  { name: 'className',  type: 'string',           default: '—',    description: 'Extra class on the alert element' },
];

export default function AlertPage() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Alert</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Inline contextual feedback messages. Use for page-level notifications, warnings, and information banners that persist until dismissed.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="All Variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <Alert variant="info">This is an informational message.</Alert>
            <Alert variant="success">Your changes have been saved successfully.</Alert>
            <Alert variant="warning">Your session will expire in 5 minutes.</Alert>
            <Alert variant="danger">Failed to process your request. Please try again.</Alert>
            <Alert variant="primary">Welcome to Switch Core design system.</Alert>
            <Alert variant="secondary">This is a neutral secondary alert.</Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Title">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <Alert variant="success" title="Payment successful">
              Your payment of $99.00 has been processed. A receipt has been sent to your email.
            </Alert>
            <Alert variant="danger" title="Connection lost">
              Unable to connect to the server. Please check your internet connection and try again.
            </Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Dismissible">
          <div style={{ width: '100%' }}>
            {showDismissible ? (
              <Alert
                variant="warning"
                title="Update available"
                dismissible
                onDismiss={() => setShowDismissible(false)}
              >
                A new version is available. Click here to update now.
              </Alert>
            ) : (
              <button
                onClick={() => setShowDismissible(true)}
                style={{
                  padding: '8px 16px',
                  background: 'var(--switch-color-activeblue-400)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Show Alert Again
              </button>
            )}
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
