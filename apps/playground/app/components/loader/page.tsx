'use client';

import { useState, useEffect } from 'react';
import { RingLoader, ProgressBar, StepProgress } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview, PreviewItem } from '@/components/ComponentPreview';

const WEB_CODE = `import { RingLoader, ProgressBar, StepProgress } from 'switch-core-react';

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

const RN_CODE = `import { RingLoader, ProgressBar, StepProgress } from 'switch-core-react-native';

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
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(1);

  // Animate progress for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 5));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: '1', label: 'Name & email' },
    { id: '2', label: 'Company details' },
    { id: '3', label: 'Invite team' },
  ];

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
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="RingLoader - Indeterminate">
          <PreviewItem label="Small">
            <RingLoader size="small" />
          </PreviewItem>
          <PreviewItem label="Medium">
            <RingLoader size="medium" />
          </PreviewItem>
          <PreviewItem label="Large">
            <RingLoader size="large" />
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="RingLoader - Determinate">
          <PreviewItem label="0%">
            <RingLoader size="large" progress={0} />
          </PreviewItem>
          <PreviewItem label="Animated">
            <RingLoader size="large" progress={progress} />
          </PreviewItem>
          <PreviewItem label="100% (checkmark)">
            <RingLoader size="large" progress={100} />
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="ProgressBar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400 }}>
            <ProgressBar value={25} size="thin" />
            <ProgressBar value={50} label="Uploading…" size="medium" />
            <ProgressBar value={75} label="Processing" showPercent size="thick" />
            <ProgressBar value={progress} label="Animated" showPercent size="medium" />
          </div>
        </ComponentPreview>

        <ComponentPreview title="StepProgress - Horizontal">
          <div style={{ width: '100%' }}>
            <StepProgress
              steps={steps}
              activeIndex={stepIndex}
              orientation="horizontal"
            />
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button
                onClick={() => setStepIndex(i => Math.max(0, i - 1))}
                style={{ padding: '6px 12px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 4, cursor: 'pointer' }}
              >
                Previous
              </button>
              <button
                onClick={() => setStepIndex(i => Math.min(steps.length - 1, i + 1))}
                style={{ padding: '6px 12px', background: 'var(--switch-color-activeblue-400)', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
              >
                Next
              </button>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="StepProgress - Vertical">
          <StepProgress
            steps={steps}
            activeIndex={stepIndex}
            orientation="vertical"
          />
        </ComponentPreview>
      </section>

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
