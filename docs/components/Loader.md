# Loader

Loading indicator for async operations.

## Import

```tsx
// React (web)
import { Loader } from '@switch/react';

// React Native
import { Loader } from '@switch/react-native';
```

## Usage

```tsx
<Loader />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Loader size |
| `color` | `string` | - | Custom color |
| `label` | `string` | - | Accessible loading text |

## Examples

### Sizes

```tsx
<Loader size="small" />
<Loader size="medium" />
<Loader size="large" />
```

### Custom Color

```tsx
<Loader color="#0066FF" />
```

### With Label

```tsx
<Loader label="Loading content..." />
```

### Button Loading State

```tsx
<Button isLoading>
  <Loader size="small" /> Submitting...
</Button>
```

### Page Loading

```tsx
{isLoading ? (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
    <Loader size="large" label="Loading page..." />
  </div>
) : (
  <PageContent />
)}
```

### Inline Loading

```tsx
<p>
  Checking availability <Loader size="small" />
</p>
```

## Accessibility

- Uses `role="status"` for screen reader announcements
- `aria-label` provides context when `label` is set
- Animation respects `prefers-reduced-motion`
