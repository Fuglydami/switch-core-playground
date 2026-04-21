# Modal

Overlay dialog component for focused interactions.

## Import

```tsx
// React (web)
import { Modal } from '@switch/react';

// React Native
import { Modal } from '@switch/react-native';
```

## Usage

```tsx
const [open, setOpen] = useState(false);

<Button onPress={() => setOpen(true)}>Open Modal</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
  <Button onPress={() => setOpen(false)}>Cancel</Button>
  <Button variant="primary" onPress={handleConfirm}>Confirm</Button>
</Modal>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Control visibility |
| `onClose` | `() => void` | - | Close handler |
| `title` | `string` | - | Modal title |
| `children` | `ReactNode` | - | Modal content |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Modal width |
| `closeOnOverlayClick` | `boolean` | `true` | Close when clicking backdrop |
| `showCloseButton` | `boolean` | `true` | Show close button in header |

## Examples

### Sizes

```tsx
<Modal open={open} onClose={onClose} size="small" title="Small Modal">
  Compact content area
</Modal>

<Modal open={open} onClose={onClose} size="large" title="Large Modal">
  Expanded content area for complex forms
</Modal>
```

### Prevent Backdrop Close

```tsx
<Modal
  open={open}
  onClose={onClose}
  closeOnOverlayClick={false}
  title="Important"
>
  You must explicitly close this modal.
</Modal>
```

### Without Close Button

```tsx
<Modal
  open={open}
  onClose={onClose}
  showCloseButton={false}
  title="Blocking Modal"
>
  <Button onPress={onClose}>I understand</Button>
</Modal>
```

### Confirmation Dialog

```tsx
function ConfirmDialog({ open, onClose, onConfirm, message }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirm" size="small">
      <p>{message}</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onPress={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onPress={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
```

## Accessibility

- Traps focus within modal when open
- Closes on Escape key press
- Backdrop prevents interaction with background content
- `role="dialog"` with `aria-modal="true"`
- Title connected via `aria-labelledby`
