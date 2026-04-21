# Tooltip

Contextual hint that appears on hover or focus.

## Import

```tsx
// React (web)
import { Tooltip } from '@switch/react';

// React Native
import { Tooltip } from '@switch/react-native';
```

## Usage

```tsx
<Tooltip content="More information">
  <Button>Hover me</Button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | **required** | Tooltip content |
| `children` | `ReactNode` | **required** | Trigger element |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |
| `delay` | `number` | `300` | Show delay (ms) |

## Examples

### Basic

```tsx
<Tooltip content="Delete this item">
  <IconButton icon={<TrashIcon />} />
</Tooltip>
```

### Placement

```tsx
<Tooltip content="Top" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left" placement="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right" placement="right">
  <Button>Right</Button>
</Tooltip>
```

### Rich Content

```tsx
<Tooltip
  content={
    <div>
      <strong>Keyboard shortcut</strong>
      <br />
      Press Cmd+S to save
    </div>
  }
>
  <Button>Save</Button>
</Tooltip>
```

### On Disabled Elements

```tsx
<Tooltip content="You don't have permission">
  <span>
    <Button disabled>Edit</Button>
  </span>
</Tooltip>
```

## Accessibility

- Uses `role="tooltip"` with `aria-describedby`
- Accessible via keyboard focus
- Respects `prefers-reduced-motion` for animations
