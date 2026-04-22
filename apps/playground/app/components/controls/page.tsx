'use client';

import { useState } from 'react';
import { Checkbox, Radio, Toggle } from '@switch/react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview, PreviewItem } from '@/components/ComponentPreview';

const WEB_CODE = `import { Checkbox, Radio, Toggle } from '@switch/react';

// Checkbox
<Checkbox label="Accept terms" size={20} />
<Checkbox label="Select all" indeterminate size={20} />
<Checkbox label="Circle style" variant="circle" size={20} />

// Radio group
<Radio label="Yes" name="choice" value="yes" defaultChecked />
<Radio label="No"  name="choice" value="no" />

// Toggle switch
<Toggle label="Notifications" size="medium" defaultChecked />
<Toggle label="Dark mode"     size="large" />`;

const RN_CODE = `import { Checkbox, Radio, Toggle } from '@switch/react-native';

// Checkbox (controlled)
<Checkbox
  label="Accept terms"
  checked={accepted}
  onChange={setAccepted}
  size={20}
/>
<Checkbox
  label="Select all"
  checked={allSelected}
  onChange={handleSelectAll}
  indeterminate={someSelected}
  size={20}
/>
<Checkbox label="Circle style" variant="circle" checked={circleChecked} onChange={setCircleChecked} />

// Radio (controlled)
const [choice, setChoice] = useState<'yes' | 'no'>('yes');

<Radio label="Yes" checked={choice === 'yes'} onChange={() => setChoice('yes')} />
<Radio label="No"  checked={choice === 'no'}  onChange={() => setChoice('no')} />

// Toggle switch (controlled)
<Toggle
  label="Notifications"
  checked={notifications}
  onChange={setNotifications}
  size="medium"
/>
<Toggle label="Dark mode" checked={darkMode} onChange={setDarkMode} size="large" />`;

const CHECKBOX_PROPS = [
  { name: 'label',         type: 'string',                    default: '—',     description: 'Accessible label rendered next to the control' },
  { name: 'variant',       type: '"square" | "circle"',       default: '"square"', description: 'Square or rounded checkbox shape' },
  { name: 'size',          type: '16 | 20 | 24',              default: '20',    description: 'Control size in px' },
  { name: 'indeterminate', type: 'boolean',                   default: 'false', description: 'Shows a dash (–) to indicate partial selection' },
  { name: 'disabled',      type: 'boolean',                   default: 'false', description: 'Prevents interaction' },
  { name: '...input',      type: 'InputHTMLAttributes',       default: '—',     description: 'All standard checkbox input props (checked, onChange, etc.)' },
];

const RADIO_PROPS = [
  { name: 'label',    type: 'string',          default: '—',  description: 'Accessible label' },
  { name: 'size',     type: '16 | 20 | 24',    default: '20', description: 'Control size in px' },
  { name: 'disabled', type: 'boolean',         default: 'false', description: 'Prevents interaction' },
  { name: '...input', type: 'InputHTMLAttributes', default: '—', description: 'All standard radio input props' },
];

const TOGGLE_PROPS = [
  { name: 'label',    type: 'string',                          default: '—',       description: 'Accessible label rendered next to the track' },
  { name: 'size',     type: '"small" | "medium" | "large"',   default: '"medium"', description: 'Track dimensions: small=32×18, medium=40×22, large=48×28' },
  { name: 'disabled', type: 'boolean',                         default: 'false',   description: 'Prevents interaction' },
  { name: '...input', type: 'InputHTMLAttributes',             default: '—',       description: 'All standard checkbox input props (checked, onChange, etc.)' },
];

export default function ControlsPage() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [indeterminate, setIndeterminate] = useState(true);
  const [circleChecked, setCircleChecked] = useState(false);
  const [radioValue, setRadioValue] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Controls & Switches</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Selection controls: Checkbox (square and circle variants), Radio button, and Toggle switch. All extend native input elements and accept full input props.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Checkbox">
          <PreviewItem label="Unchecked">
            <Checkbox label="Accept terms" checked={checked1} onChange={(e) => setChecked1(e.target.checked)} size={20} />
          </PreviewItem>
          <PreviewItem label="Checked">
            <Checkbox label="Subscribe" checked={checked2} onChange={(e) => setChecked2(e.target.checked)} size={20} />
          </PreviewItem>
          <PreviewItem label="Indeterminate">
            <Checkbox label="Select all" indeterminate={indeterminate} onChange={() => setIndeterminate(false)} size={20} />
          </PreviewItem>
          <PreviewItem label="Circle variant">
            <Checkbox label="Circle style" variant="circle" checked={circleChecked} onChange={(e) => setCircleChecked(e.target.checked)} size={20} />
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="Checkbox Sizes">
          <PreviewItem label="16px">
            <Checkbox label="Small" size={16} defaultChecked />
          </PreviewItem>
          <PreviewItem label="20px">
            <Checkbox label="Medium" size={20} defaultChecked />
          </PreviewItem>
          <PreviewItem label="24px">
            <Checkbox label="Large" size={24} defaultChecked />
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="Radio Group">
          <Radio
            label="Yes"
            name="choice"
            value="yes"
            checked={radioValue === 'yes'}
            onChange={() => setRadioValue('yes')}
          />
          <Radio
            label="No"
            name="choice"
            value="no"
            checked={radioValue === 'no'}
            onChange={() => setRadioValue('no')}
          />
          <Radio
            label="Maybe"
            name="choice"
            value="maybe"
            checked={radioValue === 'maybe'}
            onChange={() => setRadioValue('maybe')}
          />
        </ComponentPreview>

        <ComponentPreview title="Toggle">
          <PreviewItem label="Off">
            <Toggle label="Notifications" checked={toggle1} onChange={(e) => setToggle1(e.target.checked)} size="medium" />
          </PreviewItem>
          <PreviewItem label="On">
            <Toggle label="Dark mode" checked={toggle2} onChange={(e) => setToggle2(e.target.checked)} size="medium" />
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="Toggle Sizes">
          <PreviewItem label="Small">
            <Toggle label="Small" size="small" defaultChecked />
          </PreviewItem>
          <PreviewItem label="Medium">
            <Toggle label="Medium" size="medium" defaultChecked />
          </PreviewItem>
          <PreviewItem label="Large">
            <Toggle label="Large" size="large" defaultChecked />
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="Disabled States">
          <Checkbox label="Disabled" disabled size={20} />
          <Checkbox label="Disabled checked" disabled defaultChecked size={20} />
          <Radio label="Disabled" disabled />
          <Toggle label="Disabled" disabled size="medium" />
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Checkbox Props</h2>
        <PropsTable props={CHECKBOX_PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Radio Props</h2>
        <PropsTable props={RADIO_PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Toggle Props</h2>
        <PropsTable props={TOGGLE_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: 'var(--switch-color-text-secondary)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>The visible control is aria-hidden; the real <code>&lt;input&gt;</code> is focusable and screen-reader accessible.</li>
          <li>Toggle uses <code>role="switch"</code> on its underlying checkbox input.</li>
          <li>The <code>indeterminate</code> prop is set via <code>inputElement.indeterminate</code> (not an HTML attribute) for correct VoiceOver / NVDA announce.</li>
          <li>All controls are fully keyboard-operable via native browser behaviour.</li>
        </ul>
      </section>
    </article>
  );
}
