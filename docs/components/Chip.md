# Chip

Compact element for tags, filters, or selections.

## Import

```tsx
// React (web)
import { Chip } from '@switch/react';

// React Native
import { Chip } from '@switch/react-native';
```

## Usage

```tsx
<Chip>Label</Chip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Chip label |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style |
| `color` | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | Color theme |
| `size` | `'small' \| 'medium'` | `'medium'` | Chip size |
| `onPress` | `() => void` | - | Click handler (makes interactive) |
| `onRemove` | `() => void` | - | Remove handler (shows X button) |
| `icon` | `ReactNode` | - | Leading icon |
| `disabled` | `boolean` | `false` | Disable chip |

## Examples

### Basic

```tsx
<Chip>Default</Chip>
<Chip color="primary">Primary</Chip>
<Chip color="success">Success</Chip>
```

### Outlined

```tsx
<Chip variant="outlined">Outlined</Chip>
<Chip variant="outlined" color="error">Error</Chip>
```

### Removable

```tsx
<Chip onRemove={() => removeTag(id)}>Removable</Chip>
```

### Clickable

```tsx
<Chip onPress={() => toggleFilter('status')}>
  Status Filter
</Chip>
```

### With Icon

```tsx
<Chip icon={<UserIcon />}>John Doe</Chip>
```

### Tag List

```tsx
const [tags, setTags] = useState(['React', 'TypeScript', 'Node']);

<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  {tags.map((tag) => (
    <Chip key={tag} onRemove={() => setTags(t => t.filter(x => x !== tag))}>
      {tag}
    </Chip>
  ))}
</div>
```

## Accessibility

- Interactive chips have `role="button"`
- Remove button has accessible label
- Disabled state communicated to assistive tech
