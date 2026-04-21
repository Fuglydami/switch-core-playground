import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Slider' };

const WEB_CODE = `import { Slider, RangeSlider } from '@switch/react';

// Single handle
<Slider
  defaultValue={40}
  min={0}
  max={100}
  showLabels
/>

// With custom label format
<Slider
  defaultValue={3000000}
  min={300000}
  max={5000000}
  step={100000}
  showLabels
  formatLabel={(v) => \`₦\${(v / 1000000).toFixed(1)}M\`}
  onChange={(v) => console.log(v)}
/>

// Range (dual handle) — price filter
<RangeSlider
  defaultValue={[300000, 3000000]}
  min={300000}
  max={5000000}
  step={100000}
  showLabels
  formatLabel={(v) => \`₦\${(v / 1000000).toFixed(1)}M\`}
/>`;

const RN_CODE = `import { Slider } from '@switch/react-native';

// Single handle with pan gesture (via Reanimated)
<Slider
  value={value}
  onValueChange={setValue}
  min={0}
  max={100}
/>

// With custom label format
<Slider
  value={price}
  onValueChange={setPrice}
  min={300000}
  max={5000000}
  step={100000}
  formatLabel={(v) => \`₦\${(v / 1000000).toFixed(1)}M\`}
/>

// Note: RangeSlider is web-only in v1.0`;

const SLIDER_PROPS = [
  { name: 'min',          type: 'number',           default: '0',    description: 'Minimum value' },
  { name: 'max',          type: 'number',           default: '100',  description: 'Maximum value' },
  { name: 'step',         type: 'number',           default: '1',    description: 'Step increment' },
  { name: 'value',        type: 'number',           default: '—',    description: 'Controlled value' },
  { name: 'defaultValue', type: 'number',           default: '0',    description: 'Uncontrolled initial value' },
  { name: 'onChange',     type: '(value: number) => void', default: '—', description: 'Called on every change' },
  { name: 'disabled',     type: 'boolean',          default: 'false', description: 'Disables the slider' },
  { name: 'showLabels',   type: 'boolean',          default: 'false', description: 'Show min/max labels below the track' },
  { name: 'formatLabel',  type: '(value: number) => string', default: 'String(v)', description: 'Custom label formatter' },
  { name: 'size',         type: '"small" | "large"', default: '"large"', description: 'Track height' },
];

const RANGE_PROPS = [
  { name: 'value',        type: '[number, number]', default: '—',         description: 'Controlled [low, high] tuple' },
  { name: 'defaultValue', type: '[number, number]', default: '[0, 100]',  description: 'Uncontrolled initial [low, high]' },
  { name: 'onChange',     type: '(value: [number, number]) => void', default: '—', description: 'Called with updated [low, high]' },
];

export default function SliderPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Slider</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Single-handle and dual-handle (range) sliders built on native <code>&lt;input type="range"&gt;</code> with a custom styled track, fill, and thumb. Supports formatted label display.
        </p>
      </div>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Slider Props</h2>
        <PropsTable props={SLIDER_PROPS} />
      </section>
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>RangeSlider additional props</h2>
        <PropsTable props={RANGE_PROPS} />
      </section>
    </article>
  );
}
