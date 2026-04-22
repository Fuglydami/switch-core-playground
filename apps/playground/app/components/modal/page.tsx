'use client';

import { useState } from 'react';
import { Modal, Button } from '@switch/react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Modal } from '@switch/react';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm deletion"
        primaryAction={{
          label: 'Delete',
          onPress: () => handleDelete(),
        }}
        secondaryAction={{
          label: 'Cancel',
          onPress: () => setOpen(false),
        }}
      >
        <p>This will permanently delete the record. Are you sure?</p>
      </Modal>
    </>
  );
}`;

const RN_CODE = `import { Modal } from '@switch/react-native';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm deletion"
        primaryAction={{
          label: 'Delete',
          onPress: () => handleDelete(),
        }}
        secondaryAction={{
          label: 'Cancel',
          onPress: () => setOpen(false),
        }}
      >
        <Text>This will permanently delete the record. Are you sure?</Text>
      </Modal>
    </>
  );
}

// Note: Modal wraps RN's built-in <Modal> with SafeAreaView.
// Requires SafeAreaProvider at your app root.`;

const PROPS = [
  { name: 'isOpen',           type: 'boolean',          required: true,  description: 'Controls whether the modal is visible' },
  { name: 'onClose',          type: '() => void',        required: true,  description: 'Called when the backdrop, Escape key, or close button is pressed' },
  { name: 'title',            type: 'string',            required: true,  description: 'Heading rendered in the modal header' },
  { name: 'children',         type: 'React.ReactNode',   required: true,  description: 'Modal body content' },
  { name: 'size',             type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Width of the modal dialog' },
  { name: 'showCloseButton',  type: 'boolean',           default: 'true', description: 'Show the × close button in the header' },
  { name: 'primaryAction',    type: '{ label: string; onPress: () => void; isLoading?: boolean }', default: '—', description: 'Primary action button in the footer' },
  { name: 'secondaryAction',  type: '{ label: string; onPress: () => void }',                      default: '—', description: 'Secondary action button in the footer' },
];

export default function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [smallOpen, setSmallOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Modal</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Focused overlay for confirmations and short forms. Closes on backdrop click, Escape (web), or the back gesture/hardware back button (Android).
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Basic Modal">
          <Button onPress={() => setBasicOpen(true)}>Open Basic Modal</Button>
          <Modal
            isOpen={basicOpen}
            onClose={() => setBasicOpen(false)}
            title="Welcome"
          >
            <p style={{ margin: 0, color: '#374151' }}>
              This is a basic modal with just a title and content. Click the × or press Escape to close.
            </p>
          </Modal>
        </ComponentPreview>

        <ComponentPreview title="Confirmation Modal">
          <Button variant="outline" onPress={() => setConfirmOpen(true)}>Delete Item</Button>
          <Modal
            isOpen={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Confirm deletion"
            primaryAction={{
              label: 'Delete',
              onPress: () => {
                alert('Deleted!');
                setConfirmOpen(false);
              },
            }}
            secondaryAction={{
              label: 'Cancel',
              onPress: () => setConfirmOpen(false),
            }}
          >
            <p style={{ margin: 0, color: '#374151' }}>
              This will permanently delete the record. This action cannot be undone.
            </p>
          </Modal>
        </ComponentPreview>

        <ComponentPreview title="Sizes">
          <Button size="small" onPress={() => setSmallOpen(true)}>Small Modal</Button>
          <Button size="small" onPress={() => setLargeOpen(true)}>Large Modal</Button>

          <Modal
            isOpen={smallOpen}
            onClose={() => setSmallOpen(false)}
            title="Small Modal"
            size="small"
          >
            <p style={{ margin: 0, color: '#374151' }}>This is a small modal.</p>
          </Modal>

          <Modal
            isOpen={largeOpen}
            onClose={() => setLargeOpen(false)}
            title="Large Modal"
            size="large"
          >
            <p style={{ margin: 0, color: '#374151' }}>
              This is a large modal. It's useful for forms or content that needs more space.
            </p>
          </Modal>
        </ComponentPreview>
      </section>

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
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Note platform="Web" color="#00425F" bg="rgba(0,66,95,0.06)">
            Uses the native HTML <code>{'<dialog>'}</code> element with <code>showModal()</code>. Backdrop click is detected via bounding rect comparison. Escape key triggers <code>onCancel</code> → <code>onClose</code>.
          </Note>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Wraps RN's built-in <code>{'<Modal>'}</code> with <code>transparent</code> + <code>animationType="fade"</code>. Content is wrapped in <code>SafeAreaView</code> from <code>react-native-safe-area-context</code> to handle notch / home indicator insets. <code>statusBarTranslucent</code> is set for full-screen effect on Android.
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> Focus is trapped inside the dialog via the native <code>{'<dialog>'}</code> element. Title uses <code>aria-labelledby</code>.</li>
          <li><strong>iOS (VoiceOver):</strong> Title has <code>accessibilityRole="header"</code>. Close button has <code>accessibilityLabel="Close modal"</code>.</li>
          <li><strong>Android (TalkBack):</strong> Back button / hardware back triggers <code>onRequestClose</code> → <code>onClose</code>.</li>
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
