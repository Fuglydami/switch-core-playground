# Alert

Inline notification component for displaying contextual messages.

## Import

```tsx
// React (web)
import { Alert } from '@switch/react';

// React Native
import { Alert } from '@switch/react-native';
```

## Usage

```tsx
<Alert type="success" title="Success!">
  Your changes have been saved.
</Alert>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type/severity |
| `title` | `string` | - | Alert title |
| `children` | `ReactNode` | - | Alert message content |
| `dismissible` | `boolean` | `false` | Show dismiss button |
| `onDismiss` | `() => void` | - | Dismiss handler |

## Examples

### Types

```tsx
<Alert type="info" title="Note">
  This is informational content.
</Alert>

<Alert type="success" title="Success!">
  Operation completed successfully.
</Alert>

<Alert type="warning" title="Warning">
  Please review before continuing.
</Alert>

<Alert type="error" title="Error">
  Something went wrong.
</Alert>
```

### Dismissible

```tsx
const [visible, setVisible] = useState(true);

{visible && (
  <Alert
    type="info"
    title="New Feature"
    dismissible
    onDismiss={() => setVisible(false)}
  >
    Check out our new dashboard!
  </Alert>
)}
```

### Without Title

```tsx
<Alert type="error">
  Please fix the errors above before submitting.
</Alert>
```

## Accessibility

- Uses `role="alert"` for screen reader announcements
- Dismiss button has accessible label
- Color is not the only indicator of type (icons included)
