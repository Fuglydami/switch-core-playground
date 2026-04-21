# Button

Interactive button component for triggering actions.

## Import

```tsx
// React (web)
import { Button } from '@switch/react';

// React Native
import { Button } from '@switch/react-native';
```

## Usage

```tsx
<Button variant="primary" onPress={() => console.log('clicked')}>
  Submit
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Button label content |
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'large'` | Button size |
| `shape` | `'rectangular' \| 'pill'` | `'rectangular'` | Button shape |
| `colorScheme` | `'popBlue' \| 'activeBlue' \| 'primaryBlue' \| 'monochrome'` | `'activeBlue'` | Color theme |
| `isLoading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable button |
| `onPress` | `() => void` | - | Click/press handler |
| `leftIcon` | `ReactNode` | - | Icon before label (web only) |
| `rightIcon` | `ReactNode` | - | Icon after label (web only) |

## Examples

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
```

### Sizes

```tsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### Loading State

```tsx
<Button isLoading>Submitting...</Button>
```

### With Icons (web)

```tsx
import { PlusIcon, ArrowRightIcon } from '@switch/icons';

<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowRightIcon />}>Continue</Button>
```

### Pill Shape

```tsx
<Button shape="pill">Rounded Button</Button>
```

## Accessibility

- Uses native `<button>` element (web) or `Pressable` with `accessibilityRole="button"` (RN)
- `aria-busy` set when loading
- Disabled state prevents interaction and conveys state to assistive technologies
