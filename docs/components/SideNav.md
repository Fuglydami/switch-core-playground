# SideNav

Side navigation component for app layouts.

## Import

```tsx
// React (web)
import { SideNav, SideNavItem, SideNavGroup } from '@switch/react';

// React Native
import { SideNav, SideNavItem, SideNavGroup } from '@switch/react-native';
```

## Usage

```tsx
<SideNav>
  <SideNavItem icon={<HomeIcon />} active>Home</SideNavItem>
  <SideNavItem icon={<InboxIcon />}>Inbox</SideNavItem>
  <SideNavItem icon={<SettingsIcon />}>Settings</SideNavItem>
</SideNav>
```

## SideNav Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Nav items |
| `collapsed` | `boolean` | `false` | Collapse to icons only |

## SideNavItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Item label |
| `icon` | `ReactNode` | - | Item icon |
| `active` | `boolean` | `false` | Active/selected state |
| `onPress` | `() => void` | - | Press handler |
| `disabled` | `boolean` | `false` | Disable item |

## SideNavGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Group heading |
| `children` | `ReactNode` | **required** | Group items |

## Examples

### Basic

```tsx
<SideNav>
  <SideNavItem icon={<HomeIcon />} active>Dashboard</SideNavItem>
  <SideNavItem icon={<UsersIcon />}>Users</SideNavItem>
  <SideNavItem icon={<ChartIcon />}>Analytics</SideNavItem>
</SideNav>
```

### With Groups

```tsx
<SideNav>
  <SideNavGroup title="Main">
    <SideNavItem icon={<HomeIcon />}>Home</SideNavItem>
    <SideNavItem icon={<SearchIcon />}>Search</SideNavItem>
  </SideNavGroup>
  <SideNavGroup title="Settings">
    <SideNavItem icon={<UserIcon />}>Profile</SideNavItem>
    <SideNavItem icon={<GearIcon />}>Preferences</SideNavItem>
  </SideNavGroup>
</SideNav>
```

### Collapsed

```tsx
const [collapsed, setCollapsed] = useState(false);

<SideNav collapsed={collapsed}>
  <SideNavItem icon={<HomeIcon />}>Home</SideNavItem>
  <SideNavItem icon={<InboxIcon />}>Inbox</SideNavItem>
</SideNav>
```

## Accessibility

- Uses `nav` landmark with `role="navigation"`
- Active item indicated via `aria-current="page"`
- Keyboard navigable
