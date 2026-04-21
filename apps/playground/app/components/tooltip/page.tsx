import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Tooltip' };

const WEB_CODE = `import { Tooltip } from '@switch/react';

// Basic usage — wraps any focusable element
<Tooltip content="Copy to clipboard">
  <button aria-label="Copy">
    <CopyIcon />
  </button>
</Tooltip>

// Placement options
<Tooltip content="Opens in a new tab" placement="right">
  <a href="https://example.com" target="_blank">Link</a>
</Tooltip>

// Long content
<Tooltip content="Transfers are processed on the next business day after 5 PM WAT." placement="bottom">
  <InfoIcon />
</Tooltip>`;

const RN_CODE = `import { Tooltip } from '@switch/react-native';
import { Text } from 'react-native';

// Shows on long-press or press-in (since mobile has no hover)
<Tooltip content="Copy to clipboard" placement="top">
  <Pressable onPress={handleCopy}>
    <CopyIcon />
  </Pressable>
</Tooltip>

// With helper text
<Tooltip
  content="Transfer timing"
  helperText="Transfers are processed on the next business day after 5 PM WAT."
  placement="bottom"
>
  <InfoIcon />
</Tooltip>

// Note: Uses Modal-based popup, shown on press-in and hidden on press-out.`;

const PROPS = [
  { name: 'content',   type: 'string',                               required: true,  description: 'Text displayed inside the tooltip bubble' },
  { name: 'children',  type: 'React.ReactElement',                   required: true,  description: 'The trigger element. Must be a single focusable element.' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred position relative to the trigger' },
];

export default function TooltipPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Tooltip</h1>
        <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>
          Short contextual labels. On web, shown on hover and focus. On React Native, shown on long-press or press-in (no hover on mobile).
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
            Shown on <code>mouseenter</code> / <code>focus</code>, hidden on <code>mouseleave</code> /{' '}
            <code>blur</code>. The tooltip is absolutely positioned and rendered via{' '}
            <code>React.cloneElement</code> — the trigger&apos;s <code>aria-describedby</code> is wired to
            the tooltip&apos;s <code>id</code>. CSS arrow pointers are drawn with pure CSS{' '}
            <code>::before</code> pseudo-elements per placement.
          </Note>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Uses a Modal-based popup positioned relative to the trigger element. Since mobile has no hover,
            the tooltip is shown on <code>onPressIn</code> and hidden on <code>onPressOut</code> or
            <code>onLongPress</code>. Supports an optional <code>helperText</code> prop for additional context.
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> The trigger receives <code>aria-describedby</code> pointing to the tooltip element. The tooltip has <code>role="tooltip"</code>. Respects <code>prefers-reduced-motion</code> by skipping the fade animation.</li>
          <li><strong>Keyboard:</strong> Tooltip opens on <kbd>Tab</kbd> focus and closes on <kbd>Escape</kbd> or <kbd>Tab</kbd> away — matching the ARIA tooltip pattern.</li>
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
