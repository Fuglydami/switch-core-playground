# Card

Container component for grouping related content.

## Import

```tsx
// React (web)
import { Card } from '@switch/react';

// React Native
import { Card } from '@switch/react-native';
```

## Usage

```tsx
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Card content |
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Visual style |
| `padding` | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Internal padding |
| `onPress` | `() => void` | - | Makes card clickable |

## Examples

### Variants

```tsx
<Card variant="elevated">
  Elevated with shadow
</Card>

<Card variant="outlined">
  Outlined with border
</Card>

<Card variant="filled">
  Filled background
</Card>
```

### Clickable Card

```tsx
<Card onPress={() => navigate('/details')}>
  <h3>Click me</h3>
  <p>This card is interactive</p>
</Card>
```

### Custom Padding

```tsx
<Card padding="none">
  <img src="hero.jpg" alt="Hero" />
  <div style={{ padding: 16 }}>
    <h3>Image Card</h3>
  </div>
</Card>
```

### Composed Layout

```tsx
<Card>
  <Avatar src={user.avatar} />
  <div>
    <h4>{user.name}</h4>
    <p>{user.role}</p>
  </div>
  <Button variant="secondary" size="small">
    View Profile
  </Button>
</Card>
```

## Accessibility

- Clickable cards have `role="button"` and keyboard support
- Focus outline visible when card is focusable
