# ListItem

Row component for lists and menus.

## Import

```tsx
// React (web)
import { ListItem } from '@switch/react';

// React Native
import { ListItem } from '@switch/react-native';
```

## Usage

```tsx
<ListItem title="Settings" onPress={() => navigate('/settings')} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Primary text |
| `subtitle` | `string` | - | Secondary text |
| `leftIcon` | `ReactNode` | - | Leading icon |
| `rightIcon` | `ReactNode` | - | Trailing icon |
| `onPress` | `() => void` | - | Press handler |
| `disabled` | `boolean` | `false` | Disable item |
| `selected` | `boolean` | `false` | Selected state |

## Examples

### Basic

```tsx
<ListItem title="Profile" />
<ListItem title="Settings" />
<ListItem title="Help" />
```

### With Icons

```tsx
<ListItem
  leftIcon={<UserIcon />}
  title="Account"
  rightIcon={<ChevronRightIcon />}
  onPress={() => navigate('/account')}
/>
```

### With Subtitle

```tsx
<ListItem
  title="John Doe"
  subtitle="john@example.com"
  leftIcon={<Avatar name="John Doe" size="small" />}
/>
```

### Selected State

```tsx
{options.map((opt) => (
  <ListItem
    key={opt.id}
    title={opt.label}
    selected={selectedId === opt.id}
    onPress={() => setSelectedId(opt.id)}
  />
))}
```

### Navigation List

```tsx
const menuItems = [
  { icon: <HomeIcon />, title: 'Home', path: '/' },
  { icon: <InboxIcon />, title: 'Inbox', path: '/inbox' },
  { icon: <SettingsIcon />, title: 'Settings', path: '/settings' },
];

{menuItems.map((item) => (
  <ListItem
    key={item.path}
    leftIcon={item.icon}
    title={item.title}
    rightIcon={<ChevronRightIcon />}
    onPress={() => navigate(item.path)}
  />
))}
```

## Accessibility

- Interactive items have `role="button"`
- Selected state announced via `aria-selected`
- Disabled items have `aria-disabled`
