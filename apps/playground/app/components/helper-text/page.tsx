import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'HelperText' };

const WEB_CODE = `// HelperText is React Native-only.
// On web, use the helperText prop on <Input> instead:

import { Input } from '@switch/react';

<Input
  label="Transfer amount"
  helperText="Minimum transfer is NGN 100. Maximum is NGN 5,000,000 per day."
/>

// For standalone guidance blocks, use a plain <p> or a dedicated callout component.`;

const RN_CODE = `import { HelperText } from '@switch/react-native';

// Informational
<HelperText variant="info">
  Transfers are processed on the next business day after 5 PM WAT.
</HelperText>

// Warning
<HelperText variant="warning">
  Your account KYC expires in 3 days. Renew to avoid transaction limits.
</HelperText>

// Error
<HelperText variant="error">
  Insufficient funds. Please top up your wallet and try again.
</HelperText>

// Inline below an Input field
<Input label="Amount" value={amount} onChangeText={setAmount} />
<HelperText variant="info">Min: NGN 100 · Max: NGN 5,000,000</HelperText>`;

const PROPS = [
  { name: 'children', type: 'React.ReactNode', required: true,  description: 'The guidance text or JSX content' },
  { name: 'variant',  type: "'info' | 'warning' | 'error'", default: "'info'", description: 'Controls the left-border accent colour and background tint' },
];

export default function HelperTextPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>HelperText</h1>
        <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>
          Inline contextual guidance block for React Native. Replaces{' '}
          <a href="/components/tooltip" style={{ color: '#00425F' }}>Tooltip</a> at P1 on mobile since
          there is no reliable hover interaction. On web, use the <code>helperText</code> prop on{' '}
          <code>{'<Input>'}</code> or a plain paragraph instead.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Variants</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <VariantPreview
            variant="info"
            color="#0369a1"
            bg="rgba(3,105,161,0.06)"
            border="#0369a1"
            label="info"
            text="Transfers are processed on the next business day after 5 PM WAT."
          />
          <VariantPreview
            variant="warning"
            color="#b45309"
            bg="rgba(180,83,9,0.06)"
            border="#b45309"
            label="warning"
            text="Your account KYC expires in 3 days. Renew to avoid transaction limits."
          />
          <VariantPreview
            variant="error"
            color="#dc2626"
            bg="rgba(220,38,38,0.06)"
            border="#dc2626"
            label="error"
            text="Insufficient funds. Please top up your wallet and try again."
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Platform Notes</h2>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Renders as a <code>View</code> with a left border accent and a subtle background tint derived
            from the variant colour. The left border width is 3 dp. Typography uses the{' '}
            <code>tokens.fontSize.sm</code> (12) token with a <code>lineHeight</code> of 18.
          </Note>
          <Note platform="Web" color="#00425F" bg="rgba(0,66,95,0.06)">
            Not available as a standalone component on web. Use the <code>helperText</code> prop on{' '}
            <code>{'<Input>'}</code>, or use a Callout / Alert component from the roadmap (P2).
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>iOS (VoiceOver):</strong> The container <code>View</code> has <code>accessibilityRole="text"</code>. VoiceOver reads the full children text.</li>
          <li><strong>Android (TalkBack):</strong> Inherits default <code>View</code> accessibility. If placed immediately below an <code>Input</code>, TalkBack reads it in focus order after the field.</li>
        </ul>
      </section>
    </article>
  );
}

function VariantPreview({ label, text, color, bg, border }: {
  variant: string; label: string; text: string; color: string; bg: string; border: string;
}) {
  return (
    <div style={{ background: bg, borderLeft: `3px solid ${border}`, borderRadius: 6, padding: '10px 14px' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>{label}</span>
      <span style={{ fontSize: 14, color: '#374151' }}>{text}</span>
    </div>
  );
}

function Note({ platform, color, bg, children }: { platform: string; color: string; bg: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, borderRadius: 8, padding: '10px 14px' }}>
      <span style={{ fontSize: 12, fontWeight: 700, color, marginRight: 8 }}>{platform}</span>
      <span style={{ fontSize: 14, color: '#374151' }}>{children}</span>
    </div>
  );
}
