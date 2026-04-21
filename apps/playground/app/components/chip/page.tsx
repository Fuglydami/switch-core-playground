import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Chip' };

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
/>

// With press animation (built-in via Reanimated)
<Chip label="Animated" onSelect={setSelected} selected={selected} />`;

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

export default function ChipPage() {
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
