import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Accordion' };

const WEB_CODE = `import { Accordion } from '@switch/react';

const items = [
  { id: 'faq-1', label: 'What is Switch Core?', content: 'A cross-platform design system.' },
  { id: 'faq-2', label: 'How do I install it?',  content: 'Run pnpm add @switch/react' },
];

// Single open (default)
<Accordion items={items} defaultOpen={['faq-1']} />

// Multiple panels can be open
<Accordion items={items} multiple />

// Borderless variant
<Accordion items={items} variant="borderless" />`;

const RN_CODE = `import { Accordion } from '@switch/react-native';
import { Text } from 'react-native';

const items = [
  { id: 'faq-1', label: 'What is Switch Core?', content: <Text>A cross-platform design system.</Text> },
  { id: 'faq-2', label: 'How do I install it?',  content: <Text>Run npx expo install @switch/react-native</Text> },
];

// With animated chevron (via Reanimated)
<Accordion items={items} defaultOpen={['faq-1']} />

// Multiple panels can be open
<Accordion items={items} multiple />

// Borderless variant
<Accordion items={items} variant="borderless" />`;

const PROPS = [
  { name: 'items',       type: 'AccordionItem[]', required: true,  description: 'Array of accordion panel definitions' },
  { name: 'multiple',    type: 'boolean',          default: 'false', description: 'Allow more than one panel open at a time' },
  { name: 'defaultOpen', type: 'string[]',         default: '[]',    description: 'IDs of panels initially expanded (uncontrolled)' },
  { name: 'openIds',     type: 'string[]',         default: '—',     description: 'Controlled list of open panel IDs' },
  { name: 'onToggle',    type: '(openIds: string[]) => void', default: '—', description: 'Called after a panel is toggled' },
  { name: 'variant',     type: "'bordered' | 'borderless'", default: "'bordered'", description: 'Visual style variant' },
  { name: 'className',   type: 'string',           default: '—',     description: 'Extra class applied to the outer wrapper (web only)' },
];

const ITEM_PROPS = [
  { name: 'id',       type: 'string',          required: true,  description: 'Unique panel identifier' },
  { name: 'label',    type: 'string',          required: true,  description: 'Heading text shown in the trigger button' },
  { name: 'content',  type: 'React.ReactNode', required: true,  description: 'Panel body — any React content' },
  { name: 'icon',     type: 'React.ReactNode', default: '—',    description: 'Optional leading icon rendered left of the label' },
  { name: 'disabled', type: 'boolean',         default: 'false', description: 'Prevents the panel from being opened or closed' },
];

export default function AccordionPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Accordion</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Vertically stacked disclosure panels. Supports single- or multi-open mode with smooth chevron animation and full keyboard navigation.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Accordion Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>AccordionItem Shape</h2>
        <PropsTable props={ITEM_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: 'var(--switch-color-text-secondary)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Trigger buttons use <code>aria-expanded</code> and <code>aria-controls</code> linked to the panel region.</li>
          <li>Panel regions use <code>role="region"</code> with <code>aria-labelledby</code> pointing to the trigger.</li>
          <li>Hidden panels use the native <code>hidden</code> attribute so screen readers skip them.</li>
          <li>Keyboard: <kbd>Enter</kbd> / <kbd>Space</kbd> toggle the focused panel; <kbd>Tab</kbd> moves between triggers.</li>
        </ul>
      </section>
    </article>
  );
}
