'use client';

import { useState } from 'react';
import { Chip } from '@switch/react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview, PreviewItem } from '@/components/ComponentPreview';

const WEB_CODE = `import { Chip } from '@switch/react';

// Removable filter chip
<Chip
  label="Portland"
  icon={<LocationIcon />}
  count={8}
  onRemove={() => removeFilter('portland')}
/>

// Selectable chip (checkbox style)
<Chip
  label="Biking"
  selected={selected}
  onSelect={(v) => setSelected(v)}
/>

// Size variants
<Chip label="Small" size="small" />
<Chip label="Medium" size="medium" />`;

const RN_CODE = `import { Chip } from '@switch/react-native';

// Removable filter chip
<Chip
  label="Portland"
  icon={<LocationIcon />}
  count={8}
  onRemove={() => removeFilter('portland')}
/>

// Selectable chip (checkbox style)
<Chip
  label="Biking"
  selected={selected}
  onSelect={(v) => setSelected(v)}
/>`;

const PROPS = [
  { name: 'label',       type: 'string',          required: true,  description: 'Chip label text' },
  { name: 'icon',        type: 'React.ReactNode',  default: '—',    description: 'Optional leading icon or flag element (16px)' },
  { name: 'count',       type: 'number',           default: '—',    description: 'Badge count shown after the label' },
  { name: 'onRemove',    type: '() => void',       default: '—',    description: 'Callback when close button is clicked (shows close button when provided)' },
  { name: 'selected',    type: 'boolean',          default: 'false', description: 'Checked/selected state (enables checkbox-style chip)' },
  { name: 'onSelect',    type: '(selected: boolean) => void', default: '—', description: 'Called with new selected state on click' },
  { name: 'size',        type: "'small' | 'medium'", default: "'medium'", description: 'Chip size variant' },
  { name: 'disabled',    type: 'boolean',          default: 'false', description: 'Disables all interactions' },
  { name: 'className',   type: 'string',           default: '—',    description: 'Extra class on the chip element (web only)' },
];

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5C4.515 1.5 2.5 3.515 2.5 6c0 3.5 4.5 7 4.5 7S11.5 9.5 11.5 6C11.5 3.515 9.485 1.5 7 1.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />
  </svg>
);

export default function ChipPage() {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);
  const [chips, setChips] = useState(['Portland', 'Seattle', 'San Francisco']);

  const removeChip = (label: string) => {
    setChips(chips.filter(c => c !== label));
  };

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Chip</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Compact inline element for filters, tags, and multi-select. Supports dismissal, selection with a built-in checkbox indicator, leading icons, and badge counts.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Sizes">
          <PreviewItem label="Small">
            <Chip label="Small chip" size="small" />
          </PreviewItem>
          <PreviewItem label="Medium">
            <Chip label="Medium chip" size="medium" />
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="With Icon & Count">
          <Chip label="Portland" icon={<LocationIcon />} count={8} onRemove={() => {}} />
          <Chip label="Seattle" icon={<LocationIcon />} count={12} onRemove={() => {}} />
          <Chip label="New York" count={24} onRemove={() => {}} />
        </ComponentPreview>

        <ComponentPreview title="Removable (click × to remove)">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {chips.map(label => (
              <Chip key={label} label={label} onRemove={() => removeChip(label)} />
            ))}
            {chips.length === 0 && (
              <button
                onClick={() => setChips(['Portland', 'Seattle', 'San Francisco'])}
                style={{
                  padding: '6px 12px',
                  background: 'var(--switch-color-activeblue-400)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                Reset Chips
              </button>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview title="Selectable (click to toggle)">
          <Chip label="Biking" selected={selected1} onSelect={setSelected1} />
          <Chip label="Hiking" selected={selected2} onSelect={setSelected2} />
          <Chip label="Swimming" selected={false} onSelect={() => {}} />
        </ComponentPreview>

        <ComponentPreview title="Selected with Count">
          <Chip label="Featured" selected count={5} onSelect={() => {}} />
          <Chip label="Popular" selected count={42} onSelect={() => {}} />
        </ComponentPreview>

        <ComponentPreview title="Disabled">
          <Chip label="Disabled" disabled />
          <Chip label="Disabled Removable" disabled onRemove={() => {}} />
          <Chip label="Disabled Selected" disabled selected onSelect={() => {}} />
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </article>
  );
}
