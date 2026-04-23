'use client';

import { Toast } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { useToast, ToastContainer } from 'switch-core-react';

function Example() {
  const { toasts, toast } = useToast();

  return (
    <>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => toast({ type: 'success', title: 'Profile saved!' })}>
          Success
        </button>
        <button onClick={() => toast({ type: 'error', title: 'Something went wrong.' })}>
          Error
        </button>
        <button onClick={() => toast({ type: 'info', title: 'Update available.' })}>
          Info
        </button>
        <button onClick={() => toast({ type: 'warning', title: 'Low disk space.' })}>
          Warning
        </button>
      </div>
      <ToastContainer toasts={toasts} />
    </>
  );
}`;

const RN_CODE = `import { useToast, ToastContainer } from 'switch-core-react-native';

function Example() {
  const { show } = useToast();

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Button onPress={() => show({ title: 'Profile saved!', type: 'success' })}>
        Success
      </Button>
      <Button onPress={() => show({ title: 'Something went wrong.', type: 'error' })}>
        Error
      </Button>
    </View>
  );
}

// Mount <ToastContainer /> once, typically in App.tsx
// Requires SafeAreaProvider at your app root.`;

const TOAST_PROPS = [
  { name: 'type',        type: "'info' | 'success' | 'warning' | 'error' | 'informatory'", default: "'info'", description: 'Controls icon and colour' },
  { name: 'title',       type: 'string',           required: true,  description: 'Main text displayed in the toast' },
  { name: 'description', type: 'string',           default: '—',    description: 'Optional secondary text below the title' },
  { name: 'action',      type: '{ label: string; onClick: () => void }', default: '—', description: 'Optional action button' },
  { name: 'duration',    type: 'number',           default: '4000', description: 'Auto-dismiss delay in ms' },
  { name: 'onDismiss',   type: '() => void',       default: '—',    description: 'Called when dismiss button is clicked' },
];

const HOOK_RETURN = [
  { name: 'toasts', type: 'ToastProps[]', description: 'Array of active toasts to pass to ToastContainer' },
  { name: 'toast',  type: '(options: ToastOptions) => string', description: 'Enqueues a toast and returns its id' },
];

export default function ToastPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Toast</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Ephemeral feedback messages that appear temporarily. Use for non-blocking notifications like "Saved!" or "Error occurred". Auto-dismiss after 4s by default.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="All Types">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 400 }}>
            <Toast type="info" title="New update available" description="Version 2.0 is ready." onDismiss={() => {}} />
            <Toast type="success" title="Changes saved" description="Your profile was updated." onDismiss={() => {}} />
            <Toast type="warning" title="Almost at limit" description="You have used 90% of your quota." onDismiss={() => {}} />
            <Toast type="error" title="Something went wrong" description="Please try again later." onDismiss={() => {}} />
            <Toast type="informatory" title="Did you know?" description="You can customize your dashboard." onDismiss={() => {}} />
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Action">
          <div style={{ width: '100%', maxWidth: 400 }}>
            <Toast
              type="info"
              title="New version available"
              description="Version 2.0 is ready to install."
              action={{ label: 'Update now', onClick: () => alert('Update clicked!') }}
              onDismiss={() => {}}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Title Only">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 400 }}>
            <Toast type="success" title="File uploaded successfully" onDismiss={() => {}} />
            <Toast type="error" title="Failed to save changes" onDismiss={() => {}} />
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Toast Props</h2>
        <PropsTable props={TOAST_PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>useToast Hook</h2>
        <PropsTable props={HOOK_RETURN} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Platform Notes</h2>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Note platform="Web" color="#00425F" bg="rgba(0,66,95,0.06)">
            <code>ToastContainer</code> renders at fixed <code>bottom-right</code> position. Toasts stack with a slide-in animation.
          </Note>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Uses <code>Animated.View</code> with fade animations. Requires <code>SafeAreaProvider</code> at your app root for proper inset handling.
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> Each toast has <code>role="alert"</code> and <code>aria-live="polite"</code> for screen reader announcement.</li>
          <li><strong>iOS/Android:</strong> Uses <code>accessibilityLiveRegion="polite"</code> so screen readers announce without stealing focus.</li>
        </ul>
      </section>
    </article>
  );
}

function Note({ platform, color, bg, children }: { platform: string; color: string; bg: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, borderRadius: 4, padding: '10px 14px' }}>
      <span style={{ fontSize: 12, fontWeight: 700, color, marginRight: 8 }}>{platform}</span>
      <span style={{ fontSize: 14, color: '#374151' }}>{children}</span>
    </div>
  );
}
