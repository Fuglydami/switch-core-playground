import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Toast' };

const WEB_CODE = `import { useToast } from '@switch/react';

function Example() {
  const { add, dismiss } = useToast();

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => add({ message: 'Profile saved!', type: 'success' })}>
        Success
      </button>
      <button onClick={() => add({ message: 'Something went wrong.', type: 'error' })}>
        Error
      </button>
      <button onClick={() => add({ message: 'Update available.', type: 'info' })}>
        Info
      </button>
      <button onClick={() => add({ message: 'Low disk space.', type: 'warning' })}>
        Warning
      </button>
    </div>
  );
}

// Mount <ToastContainer /> once at your app root
// (already included if you wrap with <SwitchProvider>)`;

const RN_CODE = `import { useToast } from '@switch/react-native';

function Example() {
  const { show } = useToast();

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Button onPress={() => show({ message: 'Profile saved!', type: 'success' })}>
        Success
      </Button>
      <Button onPress={() => show({ message: 'Something went wrong.', type: 'error' })}>
        Error
      </Button>
    </View>
  );
}

// Mount <ToastContainer /> once, typically in App.tsx above <NavigationContainer>
// It uses useSafeAreaInsets — requires SafeAreaProvider at your app root.`;

const HOOK_PROPS = [
  { name: 'message',  type: 'string',                                    required: true,  description: 'Text displayed in the toast' },
  { name: 'type',     type: "'success' | 'error' | 'info' | 'warning'",  default: "'info'", description: 'Controls icon and colour' },
  { name: 'duration', type: 'number',                                     default: '4000', description: 'Auto-dismiss delay in ms. Pass Infinity to persist until manually dismissed.' },
];

const WEB_RETURN = [
  { name: 'add',     type: '(options: ToastOptions) => string', description: 'Enqueues a toast and returns its id' },
  { name: 'dismiss', type: '(id: string) => void',              description: 'Removes a specific toast by id' },
];

const RN_RETURN = [
  { name: 'show',    type: '(options: ToastOptions) => string', description: 'Enqueues a toast and returns its id' },
  { name: 'dismiss', type: '(id: string) => void',              description: 'Removes a specific toast by id' },
];

export default function ToastPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Toast</h1>
        <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>
          Ephemeral feedback messages. Triggered imperatively via the <code>useToast</code> hook.
          Auto-dismiss after 4 s by default.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>
          Hook options — <code>useToast(options)</code>
        </h2>
        <PropsTable props={HOOK_PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Return value — Web</h2>
        <PropsTable props={WEB_RETURN} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Return value — React Native</h2>
        <PropsTable props={RN_RETURN} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Platform Notes</h2>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Note platform="Web" color="#00425F" bg="rgba(0,66,95,0.06)">
            <code>ToastContainer</code> is a fixed-position portal rendered at <code>bottom-right</code>. Toasts stack
            with a slide-up CSS animation. The queue is managed in a React context — wrap your tree with{' '}
            <code>{'<ToastProvider>'}</code> (or use <code>{'<SwitchProvider>'}</code> which bundles it).
          </Note>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Uses <code>Animated.View</code> with Reanimated v4 <code>FadeInDown</code> / <code>FadeOutDown</code>{' '}
            entering/exiting animations. <code>useSafeAreaInsets</code> from{' '}
            <code>react-native-safe-area-context</code> is used to offset the container above the home indicator.
            Requires <code>SafeAreaProvider</code> at your app root.
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> The container has <code>role="region"</code> and <code>aria-live="polite"</code>. Each toast has <code>role="alert"</code> for immediate announcement.</li>
          <li><strong>iOS (VoiceOver):</strong> The toast view has <code>accessibilityLiveRegion="polite"</code> so VoiceOver announces it without stealing focus.</li>
          <li><strong>Android (TalkBack):</strong> Uses <code>accessibilityLiveRegion="polite"</code>. The dismiss button has an explicit <code>accessibilityLabel</code>.</li>
        </ul>
      </section>
    </article>
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
