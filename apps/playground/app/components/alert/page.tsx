import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Alert' };

const WEB_CODE = `import { Alert } from '@switch/react';

<Alert variant="success">Your payment was processed successfully.</Alert>

<Alert
  variant="danger"
  title="Payment failed"
  dismissible
  onDismiss={() => setVisible(false)}
>
  Your card was declined. Please check your payment details.
</Alert>`;

const RN_CODE = `import { Alert } from '@switch/react-native';

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
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Alert</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Contextual feedback messages for info, success, warning, danger, primary, and secondary states. Supports an optional title, custom icon, and dismissal.
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
