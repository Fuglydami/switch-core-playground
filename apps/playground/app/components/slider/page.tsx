'use client';

import { useState } from 'react';
import { Slider, RangeSlider } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview, PreviewItem } from '@/components/ComponentPreview';

const WEB_CODE = `import { Slider, RangeSlider } from 'switch-core-react';

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

const RN_CODE = `import { Slider } from 'switch-core-react-native';

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
  const [basicValue, setBasicValue] = useState(40);
  const [priceValue, setPriceValue] = useState(3000000);
  const [rangeValue, setRangeValue] = useState<[number, number]>([1000000, 4000000]);

  const formatCurrency = (v: number) => `₦${(v / 1000000).toFixed(1)}M`;

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
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Basic Slider">
          <div style={{ width: '100%', maxWidth: 400 }}>
            <p style={{ margin: '0 0 8px', fontSize: 14, color: '#6b7280' }}>Value: {basicValue}</p>
            <Slider
              value={basicValue}
              onChange={setBasicValue}
              min={0}
              max={100}
              showLabels
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Sizes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 400 }}>
            <PreviewItem label="Small">
              <div style={{ width: '100%' }}>
                <Slider defaultValue={30} min={0} max={100} size="small" showLabels />
              </div>
            </PreviewItem>
            <PreviewItem label="Large">
              <div style={{ width: '100%' }}>
                <Slider defaultValue={70} min={0} max={100} size="large" showLabels />
              </div>
            </PreviewItem>
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Custom Format (Currency)">
          <div style={{ width: '100%', maxWidth: 400 }}>
            <p style={{ margin: '0 0 8px', fontSize: 14, color: '#6b7280' }}>
              Price: {formatCurrency(priceValue)}
            </p>
            <Slider
              value={priceValue}
              onChange={setPriceValue}
              min={300000}
              max={5000000}
              step={100000}
              showLabels
              formatLabel={formatCurrency}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Range Slider (Web Only)">
          <div style={{ width: '100%', maxWidth: 400 }}>
            <p style={{ margin: '0 0 8px', fontSize: 14, color: '#6b7280' }}>
              Range: {formatCurrency(rangeValue[0])} – {formatCurrency(rangeValue[1])}
            </p>
            <RangeSlider
              value={rangeValue}
              onChange={setRangeValue}
              min={300000}
              max={5000000}
              step={100000}
              showLabels
              formatLabel={formatCurrency}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Disabled">
          <div style={{ width: '100%', maxWidth: 400 }}>
            <Slider defaultValue={50} min={0} max={100} disabled showLabels />
          </div>
        </ComponentPreview>
      </section>

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
