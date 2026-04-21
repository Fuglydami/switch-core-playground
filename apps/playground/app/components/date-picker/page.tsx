import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'DatePicker' };

const WEB_CODE = `import { DatePicker } from '@switch/react';
import { useState } from 'react';

function Example() {
  const [date, setDate] = useState<Date | null>(null);
  const today = new Date();

  return (
    <DatePicker
      label="Appointment date"
      value={date}
      onChange={setDate}
      minDate={today}
      placeholder="Choose a date"
    />
  );
}`;

const RN_CODE = `import { DatePicker } from '@switch/react-native';
import { useState } from 'react';

function Example() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      label="Date of birth"
      value={date}
      onChange={setDate}
      placeholder="Select a date"
    />
  );
}

// Peer dependency required in your app:
// npm install @react-native-community/datetimepicker
// npx pod-install  (iOS)`;

const PROPS = [
  { name: 'onChange',     type: '(date: Date) => void',   required: true,  description: 'Called when the user confirms a date selection' },
  { name: 'value',        type: 'Date | null',             default: '—',    description: 'Controlled selected date' },
  { name: 'label',        type: 'string',                  default: '—',    description: 'Label rendered above the trigger' },
  { name: 'placeholder',  type: 'string',                  default: "'Select a date'", description: 'Text shown when no date is selected' },
  { name: 'minDate',      type: 'Date',                    default: '—',    description: 'Earliest selectable date (inclusive)' },
  { name: 'maxDate',      type: 'Date',                    default: '—',    description: 'Latest selectable date (inclusive)' },
  { name: 'disabled',     type: 'boolean',                 default: 'false', description: 'Prevents interaction and dims the trigger' },
  { name: 'isError',      type: 'boolean',                 default: 'false', description: 'Applies error border styling' },
  { name: 'errorMessage', type: 'string',                  default: '—',    description: 'Error text rendered below the trigger' },
  { name: 'androidMode',  type: "'calendar' | 'spinner' | 'default'", default: "'default'", description: 'React Native Android only — native picker display mode' },
];

export default function DatePickerPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DatePicker</h1>
        <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>
          Date selection input. On web renders a custom calendar grid with full keyboard support.
          On React Native delegates to the platform native date picker via{' '}
          <code>@react-native-community/datetimepicker</code>.
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
            Renders a custom calendar grid (not <code>{'<input type="date">'}</code>) to ensure
            consistent cross-browser styling. The calendar opens as an absolutely-positioned popover
            and closes on outside click, Escape key, or day selection. Days outside{' '}
            <code>minDate</code> / <code>maxDate</code> are rendered as <code>disabled</code> buttons.
            Full keyboard support: Tab between controls, Enter/Space to select a day.
          </Note>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            On <strong>Android</strong> the native date-picker dialog is shown directly (no modal
            wrapper). On <strong>iOS</strong> the spinner wheels are presented in a bottom sheet with
            Cancel / Done buttons — the selection is only committed when the user taps Done, so{' '}
            <code>onChange</code> is not called until confirmation. Requires{' '}
            <code>@react-native-community/datetimepicker</code> installed as a peer dependency.
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> Trigger button has <code>aria-haspopup="dialog"</code> and <code>aria-expanded</code>. The calendar is a <code>role="dialog"</code> with <code>aria-modal="true"</code>. Day grid uses <code>role="grid"</code> / <code>role="gridcell"</code> with <code>aria-selected</code>. Month label has <code>aria-live="polite"</code>.</li>
          <li><strong>iOS (VoiceOver):</strong> Trigger has <code>accessibilityRole="button"</code>. The native spinner announces selected dates automatically.</li>
          <li><strong>Android (TalkBack):</strong> The native dialog is fully accessible via TalkBack with no additional wiring needed.</li>
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
