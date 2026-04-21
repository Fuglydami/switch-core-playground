# Toast

Temporary notification component for brief feedback messages.

## Import

```tsx
// React (web)
import { Toast, ToastProvider, useToast } from '@switch/react';

// React Native
import { Toast, useToast } from '@switch/react-native';
```

## Usage

```tsx
// Wrap app with provider (web)
<ToastProvider>
  <App />
</ToastProvider>

// Use the hook
function MyComponent() {
  const toast = useToast();

  const handleSave = () => {
    // ... save logic
    toast.success('Changes saved successfully');
  };

  return <Button onPress={handleSave}>Save</Button>;
}
```

## useToast Hook

```tsx
const toast = useToast();

// Methods
toast.success(message: string, options?: ToastOptions)
toast.error(message: string, options?: ToastOptions)
toast.warning(message: string, options?: ToastOptions)
toast.info(message: string, options?: ToastOptions)
toast.dismiss(id?: string)  // dismiss specific or all
```

## ToastOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `4000` | Auto-dismiss time (ms) |
| `action` | `{ label: string; onPress: () => void }` | - | Action button |

## Toast Props (Direct Usage)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Toast type |
| `message` | `string` | **required** | Toast message |
| `visible` | `boolean` | `false` | Control visibility |
| `onDismiss` | `() => void` | - | Dismiss handler |
| `duration` | `number` | `4000` | Auto-dismiss time |
| `action` | `{ label: string; onPress: () => void }` | - | Action button |

## Examples

### Basic Usage

```tsx
function SaveButton() {
  const toast = useToast();

  return (
    <Button
      onPress={() => {
        saveData();
        toast.success('Saved!');
      }}
    >
      Save
    </Button>
  );
}
```

### With Action

```tsx
toast.success('Item deleted', {
  action: {
    label: 'Undo',
    onPress: () => restoreItem(),
  },
});
```

### Custom Duration

```tsx
// Show for 10 seconds
toast.info('Processing...', { duration: 10000 });

// Show indefinitely (user must dismiss)
toast.warning('Action required', { duration: Infinity });
```

### Error Toast

```tsx
try {
  await submitForm();
  toast.success('Form submitted');
} catch (error) {
  toast.error('Failed to submit form');
}
```

### Direct Component Usage

```tsx
const [visible, setVisible] = useState(false);

<Toast
  type="success"
  message="Operation complete"
  visible={visible}
  onDismiss={() => setVisible(false)}
/>
```

## Accessibility

- Uses `role="status"` for polite announcements
- Error toasts use `role="alert"` for immediate announcement
- Action buttons are keyboard accessible
- Auto-dismiss respects reduced motion preferences
