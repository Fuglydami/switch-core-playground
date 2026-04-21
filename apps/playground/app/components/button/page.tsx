import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Button' };

const WEB_CODE = `import { Button } from '@switch/react';

// Primary
<Button variant="primary" colorScheme="activeBlue" onPress={() => {}}>
  Save changes
</Button>

// All variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="outline">Outline</Button>
<Button variant="link">Link</Button>

// Shapes
<Button shape="rectangular">Rectangular</Button>
<Button shape="pill">Pill</Button>
<Button shape="square">→</Button>
<Button shape="circle">→</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// Color schemes
<Button colorScheme="popBlue">PopBlue</Button>
<Button colorScheme="activeBlue">ActiveBlue</Button>
<Button colorScheme="primaryBlue">PrimaryBlue</Button>
<Button colorScheme="monochrome">Monochrome</Button>

// Loading state
<Button isLoading>Saving...</Button>

// With icons
<Button leftIcon={<IconPlus />}>Add item</Button>
<Button rightIcon={<IconArrow />}>Next</Button>`;

const RN_CODE = `import { Button } from '@switch/react-native';

// Primary
<Button variant="primary" colorScheme="activeBlue" onPress={() => {}}>
  Save changes
</Button>

// All variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="outline">Outline</Button>
<Button variant="link">Link</Button>

// Shapes
<Button shape="rectangular">Rectangular</Button>
<Button shape="pill">Pill</Button>
<Button shape="square">→</Button>
<Button shape="circle">→</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// Color schemes
<Button colorScheme="popBlue">PopBlue</Button>
<Button colorScheme="activeBlue">ActiveBlue</Button>
<Button colorScheme="primaryBlue">PrimaryBlue</Button>
<Button colorScheme="monochrome">Monochrome</Button>

// Loading state (shows ActivityIndicator)
<Button isLoading>Saving...</Button>

// With Reanimated press animation (built-in)
<Button onPress={handlePress}>Tap me</Button>`;

const PROPS = [
  { name: 'variant',      type: "'primary' | 'secondary' | 'tertiary' | 'outline' | 'link'",  default: "'primary'",      description: 'Visual style of the button' },
  { name: 'colorScheme',  type: "'popBlue' | 'activeBlue' | 'primaryBlue' | 'monochrome'",    default: "'activeBlue'",   description: 'Color palette applied to the variant' },
  { name: 'size',         type: "'small' | 'medium' | 'large'",                               default: "'large'",        description: 'Button height and padding' },
  { name: 'shape',        type: "'rectangular' | 'pill' | 'square' | 'circle'",               default: "'rectangular'",  description: 'Button border radius shape. Use square/circle for icon-only buttons.' },
  { name: 'isLoading',    type: 'boolean',                                          default: 'false',        description: 'Shows a loading spinner and disables interaction' },
  { name: 'disabled',     type: 'boolean',                                          default: 'false',        description: 'Disables all interaction and dims the button' },
  { name: 'onPress',      type: '() => void',                                       default: '—',            description: 'Called when the button is pressed/clicked' },
  { name: 'children',     type: 'React.ReactNode',                                  required: true,          description: 'Button label content' },
  { name: 'leftIcon',     type: 'React.ReactNode',                                  default: '—',            description: 'Icon rendered to the left of the label' },
  { name: 'rightIcon',    type: 'React.ReactNode',                                  default: '—',            description: 'Icon rendered to the right of the label' },
];

export default function ButtonPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Button</h1>
        <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>
          Triggers an action or event. Available in three variants, four color schemes, and two shapes across both platforms.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Props</h2>
        <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 12px' }}>
          Shared across web and React Native. Web additionally accepts all native{' '}
          <code>{'<button>'}</code> HTML attributes; RN accepts all{' '}
          <code>PressableProps</code>.
        </p>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Platform Notes</h2>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PlatformNote platform="Web" color="#00425F" bg="rgba(0,66,95,0.06)">
            Renders as a native <code>{'<button>'}</code> element. Press animation is handled by CSS <code>:active</code> states in the CSS Module.
          </PlatformNote>
          <PlatformNote platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Renders as <code>Animated.Pressable</code> (via Reanimated). Has a built-in 0.97 scale press animation on <code>onPressIn</code>. Requires <code>GestureHandlerRootView</code> at the app root.
          </PlatformNote>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> Uses <code>role="button"</code> natively. Supports keyboard activation with Enter and Space. <code>aria-busy</code> is set when loading.</li>
          <li><strong>iOS (VoiceOver):</strong> <code>accessibilityRole="button"</code> announces as "button". Loading state announces via <code>accessibilityState.busy</code>.</li>
          <li><strong>Android (TalkBack):</strong> Same as iOS. <code>android_ripple</code> provides tactile feedback on press.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Consumer Setup</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Web</p>
            <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '12px 16px', borderRadius: 8, fontSize: 13, margin: 0, overflow: 'auto' }}>
              {`pnpm add @switch/react @switch/tokens`}
            </pre>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>React Native (Expo)</p>
            <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '12px 16px', borderRadius: 8, fontSize: 13, margin: 0, overflow: 'auto' }}>
              {`npx expo install @switch/react-native \\
  react-native-reanimated \\
  react-native-gesture-handler \\
  react-native-safe-area-context`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Figma</h2>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
          View the Button component in{' '}
          <a
            href="https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core?node-id=0-1"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--switch-color-semantic-interactive)' }}
          >
            Figma — Switch Core
          </a>
          . In Dev Mode, the Code Connect snippet shows the correct import and props.
        </p>
      </section>
    </article>
  );
}

function PlatformNote({
  platform, color, bg, children,
}: {
  platform: string;
  color: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: bg, borderRadius: 8, padding: '10px 14px' }}>
      <span style={{ fontSize: 12, fontWeight: 700, color, marginRight: 8 }}>{platform}</span>
      <span style={{ fontSize: 14, color: '#374151' }}>{children}</span>
    </div>
  );
}
