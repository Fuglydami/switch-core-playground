# Menu

Dropdown menu for actions and navigation.

## Import

```tsx
// React (web)
import { Menu, MenuTrigger, MenuContent, MenuItem } from '@switch/react';

// React Native
import { Menu, MenuTrigger, MenuContent, MenuItem } from '@switch/react-native';
```

## Usage

```tsx
<Menu>
  <MenuTrigger>
    <Button>Options</Button>
  </MenuTrigger>
  <MenuContent>
    <MenuItem onPress={() => edit()}>Edit</MenuItem>
    <MenuItem onPress={() => duplicate()}>Duplicate</MenuItem>
    <MenuItem onPress={() => remove()} destructive>Delete</MenuItem>
  </MenuContent>
</Menu>
```

## Menu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Trigger and content |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change handler |

## MenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Item content |
| `onPress` | `() => void` | - | Press handler |
| `icon` | `ReactNode` | - | Leading icon |
| `disabled` | `boolean` | `false` | Disable item |
| `destructive` | `boolean` | `false` | Destructive action styling |

## Examples

### Basic

```tsx
<Menu>
  <MenuTrigger>
    <Button variant="secondary">Actions</Button>
  </MenuTrigger>
  <MenuContent>
    <MenuItem onPress={handleView}>View</MenuItem>
    <MenuItem onPress={handleEdit}>Edit</MenuItem>
    <MenuItem onPress={handleShare}>Share</MenuItem>
  </MenuContent>
</Menu>
```

### With Icons

```tsx
<Menu>
  <MenuTrigger>
    <IconButton icon={<MoreIcon />} />
  </MenuTrigger>
  <MenuContent>
    <MenuItem icon={<EditIcon />} onPress={edit}>Edit</MenuItem>
    <MenuItem icon={<CopyIcon />} onPress={copy}>Copy</MenuItem>
    <MenuItem icon={<TrashIcon />} onPress={del} destructive>Delete</MenuItem>
  </MenuContent>
</Menu>
```

### Controlled

```tsx
const [open, setOpen] = useState(false);

<Menu open={open} onOpenChange={setOpen}>
  <MenuTrigger>
    <Button>Menu</Button>
  </MenuTrigger>
  <MenuContent>
    <MenuItem onPress={() => { action(); setOpen(false); }}>
      Action
    </MenuItem>
  </MenuContent>
</Menu>
```

## Accessibility

- Uses `role="menu"` and `role="menuitem"`
- Keyboard navigation with arrow keys
- Escape closes menu
- Focus trapped within menu when open
