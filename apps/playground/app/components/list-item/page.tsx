import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'ListItem' };

const WEB_CODE = `import { ListItem } from '@switch/react';

// Default — static list row
<ListItem
  title="Ngozi Adeyemi"
  subtitle="ngozi@example.com"
  leading={<Avatar src="/avatars/ngozi.jpg" />}
  trailing={<ChevronRightIcon />}
/>

// Pressable row (renders as <button>)
<ListItem
  title="Security settings"
  subtitle="Manage 2FA and active sessions"
  leading={<ShieldIcon />}
  trailing={<ChevronRightIcon />}
  onPress={() => router.push('/settings/security')}
/>

// Compact variant
<ListItem
  variant="compact"
  title="Transaction · NGN 12,500"
  trailing={<span style={{ color: 'green' }}>+</span>}
/>

// Destructive variant
<ListItem
  variant="destructive"
  title="Delete account"
  onPress={openDeleteModal}
/>`;

const RN_CODE = `import { ListItem } from '@switch/react-native';

// Default — static row
<ListItem
  title="Ngozi Adeyemi"
  subtitle="ngozi@example.com"
  leading={<Image source={{ uri: '/avatars/ngozi.jpg' }} style={styles.avatar} />}
  trailing={<ChevronRightIcon />}
/>

// Pressable row (Pressable with android_ripple)
<ListItem
  title="Security settings"
  subtitle="Manage 2FA and active sessions"
  leading={<ShieldIcon />}
  trailing={<ChevronRightIcon />}
  onPress={() => navigation.navigate('Security')}
/>

// Compact variant
<ListItem
  variant="compact"
  title="Transaction · NGN 12,500"
  trailing={<Text style={{ color: 'green' }}>+</Text>}
/>

// Destructive variant
<ListItem
  variant="destructive"
  title="Delete account"
  onPress={openDeleteModal}
/>`;

const PROPS = [
  { name: 'title',    type: 'string',                   required: true,  description: 'Primary label rendered in the row' },
  { name: 'subtitle', type: 'string',                   default: '—',    description: 'Secondary text rendered below the title' },
  { name: 'leading',  type: 'React.ReactNode',          default: '—',    description: 'Content rendered on the leading (left) edge — typically an icon or avatar' },
  { name: 'trailing', type: 'React.ReactNode',          default: '—',    description: 'Content rendered on the trailing (right) edge — typically a chevron or badge' },
  { name: 'onPress',  type: '() => void',               default: '—',    description: 'When provided, the row renders as a pressable element with hover/active states' },
  { name: 'variant',  type: "'default' | 'compact' | 'destructive' | 'disabled'", default: "'default'", description: 'Visual and interaction variant' },
];

export default function ListItemPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>ListItem</h1>
        <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>
          A flexible row component for menus, settings screens, and contact lists.
          Renders as a static element by default, or as a pressable when <code>onPress</code> is provided.
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
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Platform Notes</h2>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Note platform="Web" color="#00425F" bg="rgba(0,66,95,0.06)">
            When <code>onPress</code> is provided, the row renders as a <code>{'<button>'}</code> so it
            is keyboard-accessible and receives a pointer cursor. Without <code>onPress</code> it renders
            as a <code>{'<div>'}</code>.
          </Note>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Always renders as <code>Pressable</code>. On Android, pressing triggers the native ink ripple
            via <code>android_ripple</code>. The <code>disabled</code> variant sets{' '}
            <code>{'{ disabled: true }'}</code> on <code>Pressable</code> and reduces opacity to 0.4.
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> Interactive rows use <code>{'<button>'}</code>, so they receive focus, respond to Enter/Space, and announce their label via the DOM.</li>
          <li><strong>iOS (VoiceOver):</strong> <code>accessibilityLabel</code> is composed from <code>title</code> + <code>subtitle</code>. Disabled variant sets <code>accessibilityState.disabled</code>.</li>
          <li><strong>Android (TalkBack):</strong> Inherits from Pressable. The destructive variant uses <code>accessibilityHint="Destructive action"</code> to warn screen-reader users.</li>
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
