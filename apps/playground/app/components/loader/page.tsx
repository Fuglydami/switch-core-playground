import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Loader' };

const WEB_CODE = `import { RingLoader, ProgressBar, StepProgress } from '@switch/react';

// Indeterminate spinner
<RingLoader size="medium" />

// Determinate ring (shows check at 100)
<RingLoader size="large" progress={uploadPct} />

// Progress bar
<ProgressBar value={65} label="Uploading…" showPercent size="medium" />

// Step progress — horizontal
<StepProgress
  steps={[
    { id: '1', label: 'Name & email' },
    { id: '2', label: 'Company details' },
    { id: '3', label: 'Invite team' },
  ]}
  activeIndex={1}
/>

// Step progress — vertical
<StepProgress
  steps={steps}
  activeIndex={2}
  orientation="vertical"
/>`;

const RN_CODE = `import { RingLoader, ProgressBar, StepProgress } from '@switch/react-native';

// Indeterminate spinner
<RingLoader size="medium" />

// Determinate ring (shows check at 100)
<RingLoader size="large" progress={uploadPct} />

// Progress bar
<ProgressBar value={65} label="Uploading…" showPercent size="medium" />

// Step progress — horizontal
<StepProgress
  steps={[
    { id: '1', label: 'Name & email' },
    { id: '2', label: 'Company details' },
    { id: '3', label: 'Invite team' },
  ]}
  activeIndex={1}
/>

// Step progress — vertical
<StepProgress
  steps={steps}
  activeIndex={2}
  orientation="vertical"
/>`;

const RING_PROPS = [
  { name: 'progress',   type: 'number',              default: '—',       description: '0–100. Undefined = indeterminate spin. 100 = green checkmark.' },
  { name: 'size',       type: '"small" | "medium" | "large"', default: '"medium"', description: 'Diameter: small=16px, medium=24px, large=40px' },
  { name: 'aria-label', type: 'string',              default: '"Loading"', description: 'Accessible label for the progressbar' },
];

const BAR_PROPS = [
  { name: 'value',         type: 'number',                        required: true,  description: 'Progress value 0–100' },
  { name: 'size',          type: '"thin" | "medium" | "thick"',  default: '"medium"', description: 'Track height: thin=2px, medium=4px, thick=8px' },
  { name: 'label',         type: 'string',                        default: '—',    description: 'Left label' },
  { name: 'trailingLabel', type: 'string',                        default: '—',    description: 'Right label (explicit override)' },
  { name: 'showPercent',   type: 'boolean',                       default: 'false', description: 'Show rounded percentage as the right label' },
];

const STEP_PROPS = [
  { name: 'steps',       type: 'ProgressStep[]',                     required: true, description: 'Step definitions — id, label, optional description' },
  { name: 'activeIndex', type: 'number',                             required: true, description: '0-based index of the current active step' },
  { name: 'orientation', type: '"horizontal" | "vertical"',          default: '"horizontal"', description: 'Layout direction' },
];

export default function LoaderPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Loader</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Three loader primitives: RingLoader (indeterminate or determinate spinner that shows a checkmark at 100%), ProgressBar (labelled linear track), and StepProgress (multi-step wizard indicator, horizontal or vertical).
        </p>
      </div>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>RingLoader Props</h2>
        <PropsTable props={RING_PROPS} />
      </section>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>ProgressBar Props</h2>
        <PropsTable props={BAR_PROPS} />
      </section>
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>StepProgress Props</h2>
        <PropsTable props={STEP_PROPS} />
      </section>
    </article>
  );
}
