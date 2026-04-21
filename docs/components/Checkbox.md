# Checkbox

Toggle component for binary choices or multiple selections.

## Import

```tsx
// React (web)
import { Checkbox } from '@switch/react';

// React Native
import { Checkbox } from '@switch/react-native';
```

## Usage

```tsx
<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(checked) => setAccepted(checked)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Checkbox label |
| `checked` | `boolean` | `false` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable checkbox |
| `indeterminate` | `boolean` | `false` | Show indeterminate state |
| `error` | `boolean` | `false` | Show error state |
| `helperText` | `string` | - | Helper text below checkbox |

## Examples

### Basic

```tsx
<Checkbox label="Remember me" />
```

### Controlled

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  label="Enable notifications"
  checked={checked}
  onChange={setChecked}
/>
```

### Group

```tsx
const [selected, setSelected] = useState<string[]>([]);

const toggleOption = (value: string) => {
  setSelected((prev) =>
    prev.includes(value)
      ? prev.filter((v) => v !== value)
      : [...prev, value]
  );
};

<div role="group" aria-label="Notification preferences">
  <Checkbox
    label="Email"
    checked={selected.includes('email')}
    onChange={() => toggleOption('email')}
  />
  <Checkbox
    label="SMS"
    checked={selected.includes('sms')}
    onChange={() => toggleOption('sms')}
  />
  <Checkbox
    label="Push"
    checked={selected.includes('push')}
    onChange={() => toggleOption('push')}
  />
</div>
```

### Indeterminate (Select All)

```tsx
const allSelected = items.every((i) => i.selected);
const someSelected = items.some((i) => i.selected);

<Checkbox
  label="Select all"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={(checked) => selectAll(checked)}
/>
```

### With Error

```tsx
<Checkbox
  label="I agree to the terms"
  error={!accepted && submitted}
  helperText={!accepted && submitted ? 'You must accept the terms' : undefined}
/>
```

## Accessibility

- Uses native checkbox input (web) or accessible Pressable (RN)
- Label associated with input via `htmlFor`/`accessibilityLabel`
- Keyboard navigable and activatable with Space
- `aria-checked="mixed"` for indeterminate state
