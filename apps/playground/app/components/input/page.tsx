import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Input & Select' };

const WEB_CODE = `import { Input, Select } from '@switch/react';

// Basic input
<Input
  label="Email address"
  placeholder="you@example.com"
  onChangeText={(text) => setEmail(text)}
/>

// With helper text
<Input
  label="Email"
  helperText="We will never share your email"
/>

// Error state
<Input
  label="Email"
  value={email}
  isError
  errorMessage="Please enter a valid email address."
/>

// Success state
<Input
  label="Username"
  value="available_user"
  isSuccess
  successMessage="Username is available!"
/>

// Warning state
<Input
  label="Email"
  value="existing@example.com"
  isWarning
  warningMessage="This email is already registered"
/>

// Sizes
<Input label="Small" size="small" />
<Input label="Medium" size="medium" />
<Input label="Large" size="large" />

// Select
<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { label: 'Nigeria', value: 'ng' },
    { label: 'Ghana',   value: 'gh' },
  ]}
/>`;

const RN_CODE = `import { Input } from '@switch/react-native';

// Basic input
<Input
  label="Email address"
  placeholder="you@example.com"
  onChangeText={(text) => setEmail(text)}
/>

// With error state
<Input
  label="Email"
  value={email}
  isError
  errorMessage="Please enter a valid email."
  onChangeText={(text) => setEmail(text)}
/>

// Disabled
<Input label="Account ID" value="ACC-00123" disabled />

// Note: Select is not in @switch/react-native v1.0.
// Use the platform Picker or a custom bottom-sheet picker instead.`;

const INPUT_PROPS = [
  { name: 'label',          type: 'string',              default: '—',       description: 'Label rendered above the input' },
  { name: 'placeholder',    type: 'string',              default: '—',       description: 'Placeholder text when empty' },
  { name: 'value',          type: 'string',              default: '—',       description: 'Controlled value' },
  { name: 'onChangeText',   type: '(text: string) => void', default: '—',    description: 'Called on every keystroke with the new value' },
  { name: 'helperText',     type: 'string',              default: '—',       description: 'Helper text rendered below the input' },
  { name: 'isError',        type: 'boolean',             default: 'false',   description: 'Applies error border and styling' },
  { name: 'errorMessage',   type: 'string',              default: '—',       description: 'Error message rendered below the input (requires isError)' },
  { name: 'isSuccess',      type: 'boolean',             default: 'false',   description: 'Applies success border and styling' },
  { name: 'successMessage', type: 'string',              default: '—',       description: 'Success message rendered below the input (requires isSuccess)' },
  { name: 'isWarning',      type: 'boolean',             default: 'false',   description: 'Applies warning border and styling' },
  { name: 'warningMessage', type: 'string',              default: '—',       description: 'Warning message rendered below the input (requires isWarning)' },
  { name: 'size',           type: "'small' | 'medium' | 'large'", default: "'large'", description: 'Input height and font size' },
  { name: 'disabled',       type: 'boolean',             default: 'false',   description: 'Disables editing and dims the input' },
];

export default function InputPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Input & Select</h1>
        <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>
          Text input with label, helper text, and error states. Select is web-only in v1.0.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Props — Input</h2>
        <PropsTable props={INPUT_PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Platform Notes</h2>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Note platform="Web" color="#00425F" bg="rgba(0,66,95,0.06)">
            Renders as a native <code>{'<input>'}</code>. Focus ring uses the <code>:focus-within</code> CSS selector on the wrapper. <code>Select</code> renders as a native <code>{'<select>'}</code> with a custom chevron overlay.
          </Note>
          <Note platform="React Native" color="#6d28d9" bg="rgba(109,40,217,0.06)">
            Renders as <code>TextInput</code>. Focus border is driven by React <code>useState</code> on <code>onFocus</code>/<code>onBlur</code>. Select is not available in v1.0 — use the native <code>Picker</code> from <code>@react-native-picker/picker</code> or a custom bottom-sheet.
          </Note>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Web:</strong> Label is associated via <code>htmlFor</code>/<code>id</code>. Error messages use <code>aria-describedby</code> and <code>aria-invalid</code>.</li>
          <li><strong>iOS / Android:</strong> <code>accessibilityLabel</code> is set from the <code>label</code> prop. Disabled state uses <code>accessibilityState.disabled</code>.</li>
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
