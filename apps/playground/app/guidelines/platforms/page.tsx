import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';

export const metadata: Metadata = { title: 'Platform Guide' };

export default function PlatformsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Platform Guide</h1>
      <p style={{ color: '#6b7280', fontSize: 16, margin: '0 0 40px' }}>
        When to use <code>switch-core-react</code> vs <code>switch-core-react-native</code>, and how to set up each in a consumer project.
      </p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Package Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <PackageCard
            name="switch-core-react"
            badge={<PlatformBadge platforms={['web']} />}
            description="React 19 components using HTML primitives, CSS Modules, and CSS custom properties from @switch/tokens/css."
            install="pnpm add switch-core-react @switch/tokens"
          />
          <PackageCard
            name="switch-core-react-native"
            badge={<PlatformBadge platforms={['ios', 'android']} />}
            description="React Native 0.84 components using View/Text/Pressable, StyleSheet.create(), and unitless tokens from @switch/tokens/rn."
            install="npx expo install switch-core-react-native react-native-reanimated react-native-gesture-handler react-native-safe-area-context"
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Shared Token Architecture</h2>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: 12, fontSize: 13, overflow: 'auto' }}>
{`@switch/tokens ──▶  dist/css/variables.css  →  switch-core-react (web)
             ╚────▶  dist/rn/tokens.js       →  switch-core-react-native (mobile)

@switch/types  ──▶  both packages (shared prop interfaces — onPress convention)`}
        </pre>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 12 }}>
          The <code>@switch/tokens/rn</code> output strips <code>px</code> units and outputs bare numbers — React Native's <code>StyleSheet</code> requires unitless values. Do not manually strip units in component code; rely on the token pipeline.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>React Native Consumer Setup</h2>
        <p style={{ fontSize: 14, color: '#374151', margin: '0 0 12px' }}>
          Wrap your app root with <code>GestureHandlerRootView</code> and <code>SafeAreaProvider</code>. These are required by <code>react-native-gesture-handler</code> and <code>react-native-safe-area-context</code>.
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: 12, fontSize: 13, overflow: 'auto' }}>
{`import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* your app */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}`}
        </pre>
        <div style={{ background: 'rgba(238,49,42,0.06)', border: '1px solid rgba(238,49,42,0.2)', borderRadius: 8, padding: '10px 14px', marginTop: 12 }}>
          <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>
            <strong>New Architecture required.</strong> <code>switch-core-react-native</code> uses <code>react-native-reanimated</code> v4 and requires <code>newArchEnabled: true</code> in your Expo config. The legacy bridge is not supported.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>API Parity Convention</h2>
        <p style={{ fontSize: 14, color: '#374151', margin: '0 0 12px' }}>
          All component props use the <strong>React Native convention</strong> (<code>onPress</code>, not <code>onClick</code>). The web package maps <code>onPress → onClick</code> internally. This means you can copy component usage code between platforms without renaming props.
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: 12, fontSize: 13, overflow: 'auto' }}>
{`// Same code works on both platforms (different import path):

// Web
import { Button } from 'switch-core-react';
// RN
import { Button } from 'switch-core-react-native';

<Button variant="primary" colorScheme="activeBlue" onPress={() => save()}>
  Save changes
</Button>`}
        </pre>
      </section>
    </div>
  );
}

function PackageCard({
  name, badge, description, install,
}: {
  name: string;
  badge: React.ReactNode;
  description: string;
  install: string;
}) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {badge}
      <p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: 'var(--switch-typography-font-family-mono)' }}>{name}</p>
      <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{description}</p>
      <pre style={{ background: '#f3f4f6', borderRadius: 8, padding: '8px 12px', fontSize: 12, margin: 0, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {install}
      </pre>
    </div>
  );
}
