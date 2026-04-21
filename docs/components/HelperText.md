# HelperText

Inline helper message for providing contextual information.

## Import

```tsx
// React (web)
import { HelperText } from '@switch/react';

// React Native
import { HelperText } from '@switch/react-native';
```

## Usage

```tsx
<HelperText text="This field is required" variant="error" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | Message text |
| `variant` | `'info' \| 'warning' \| 'error'` | `'info'` | Message type |
| `icon` | `ReactNode` | - | Custom icon (default based on variant) |

## Examples

### Variants

```tsx
<HelperText text="This is an informational message." variant="info" />
<HelperText text="Please review this information." variant="warning" />
<HelperText text="This field contains an error." variant="error" />
```

### Custom Icon

```tsx
<HelperText
  text="Your progress is saved automatically."
  variant="info"
  icon={<CloudIcon />}
/>
```

### With Form Fields

```tsx
<Input label="Password" type="password" />
<HelperText
  text="Password must be at least 8 characters."
  variant="info"
/>
```

### Error State

```tsx
<Input label="Email" isError />
<HelperText
  text="Please enter a valid email address."
  variant="error"
/>
```

## Accessibility

- Uses `role="status"` for polite announcements
- `aria-live="polite"` for screen reader updates
- Icon is decorative (`aria-hidden`)
