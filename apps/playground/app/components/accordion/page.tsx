'use client';

import { useState } from 'react';
import { Accordion } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Accordion } from 'switch-core-react';

const items = [
  { id: 'faq-1', label: 'What is Switch Core?', content: 'A cross-platform design system.' },
  { id: 'faq-2', label: 'How do I install it?',  content: 'Run pnpm add switch-core-react' },
];

// Single open (default)
<Accordion items={items} defaultOpen={['faq-1']} />

// Multiple panels can be open
<Accordion items={items} multiple />

// Borderless variant
<Accordion items={items} variant="borderless" />`;

const RN_CODE = `import { Accordion } from 'switch-core-react-native';
import { Text } from 'react-native';

const items = [
  { id: 'faq-1', label: 'What is Switch Core?', content: <Text>A cross-platform design system.</Text> },
  { id: 'faq-2', label: 'How do I install it?',  content: <Text>Run npx expo install switch-core-react-native</Text> },
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
  const [controlledOpen, setControlledOpen] = useState<string[]>(['faq-1']);

  const faqItems = [
    { id: 'faq-1', label: 'What is Switch Core?', content: 'Switch Core is a cross-platform design system that provides consistent UI components for web (React) and mobile (React Native) applications.' },
    { id: 'faq-2', label: 'How do I install it?', content: 'For web, run `pnpm add switch-core-react @switch/tokens`. For React Native, run `npx expo install switch-core-react-native`.' },
    { id: 'faq-3', label: 'Is it production ready?', content: 'Yes! Switch Core is actively used in production applications and is maintained by a dedicated team.' },
  ];

  const paymentItems = [
    { id: 'pay-1', label: 'How long do transfers take?', content: 'Transfers are typically processed within minutes during business hours. International transfers may take 1-3 business days.' },
    { id: 'pay-2', label: 'What are the transfer limits?', content: 'Daily limit: NGN 5,000,000. Monthly limit: NGN 50,000,000. Contact support to increase limits.' },
    { id: 'pay-3', label: 'Are there any fees?', content: 'Domestic transfers are free. International transfers have a 1% fee (capped at NGN 10,000).' },
  ];

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
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Single Open (Default)">
          <div style={{ width: '100%' }}>
            <Accordion items={faqItems} defaultOpen={['faq-1']} />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Multiple Open">
          <div style={{ width: '100%' }}>
            <Accordion items={paymentItems} multiple defaultOpen={['pay-1', 'pay-2']} />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Borderless Variant">
          <div style={{ width: '100%' }}>
            <Accordion items={faqItems} variant="borderless" defaultOpen={['faq-2']} />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Controlled">
          <div style={{ width: '100%' }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, color: '#6b7280' }}>
              Open panels: {controlledOpen.length > 0 ? controlledOpen.join(', ') : 'none'}
            </p>
            <Accordion
              items={faqItems}
              openIds={controlledOpen}
              onToggle={setControlledOpen}
              multiple
            />
          </div>
        </ComponentPreview>
      </section>

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
