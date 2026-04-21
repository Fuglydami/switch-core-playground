# Avatar

User profile image or initials display.

## Import

```tsx
// React (web)
import { Avatar } from '@switch/react';

// React Native
import { Avatar } from '@switch/react-native';
```

## Usage

```tsx
<Avatar src="https://example.com/user.jpg" alt="John Doe" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image URL |
| `alt` | `string` | - | Alt text for image |
| `name` | `string` | - | Name for initials fallback |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Avatar size |
| `shape` | `'circle' \| 'square'` | `'circle'` | Avatar shape |

## Examples

### With Image

```tsx
<Avatar src="/avatars/jane.jpg" alt="Jane Smith" size="large" />
```

### Initials Fallback

```tsx
<Avatar name="John Doe" />
// Displays "JD"
```

### Sizes

```tsx
<Avatar src={url} size="small" />
<Avatar src={url} size="medium" />
<Avatar src={url} size="large" />
```

### Square Shape

```tsx
<Avatar src={url} shape="square" />
```

### Group

```tsx
<div style={{ display: 'flex', marginLeft: -8 }}>
  <Avatar src={user1} style={{ marginLeft: 8 }} />
  <Avatar src={user2} style={{ marginLeft: 8 }} />
  <Avatar name="+3" style={{ marginLeft: 8 }} />
</div>
```

## Accessibility

- Uses `role="img"` with `alt` text for images
- Decorative avatars can use `alt=""`
