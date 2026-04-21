# Divider

Visual separator for content sections.

## Import

```tsx
// React (web)
import { Divider } from '@switch/react';

// React Native
import { Divider } from '@switch/react-native';
```

## Usage

```tsx
<Divider />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider direction |
| `variant` | `'solid' \| 'dashed'` | `'solid'` | Line style |
| `label` | `string` | - | Center label text |

## Examples

### Horizontal

```tsx
<p>Content above</p>
<Divider />
<p>Content below</p>
```

### Vertical

```tsx
<div style={{ display: 'flex', height: 40, alignItems: 'center', gap: 16 }}>
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>
```

### Dashed

```tsx
<Divider variant="dashed" />
```

### With Label

```tsx
<Divider label="OR" />
```

### In Forms

```tsx
<Input label="Email" />
<Divider label="or continue with" />
<Button variant="secondary">Google</Button>
```

## Accessibility

- Uses `role="separator"` for semantic meaning
- `aria-orientation` set based on direction
