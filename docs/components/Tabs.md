# Tabs

Tabbed navigation component for organizing content into panels.

## Import

```tsx
// React (web)
import { Tabs, TabList, Tab, TabPanel } from '@switch/react';

// React Native
import { Tabs, TabList, Tab, TabPanel } from '@switch/react-native';
```

## Usage

```tsx
<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="settings">Settings</Tab>
    <Tab value="billing">Billing</Tab>
  </TabList>

  <TabPanel value="overview">
    <p>Overview content...</p>
  </TabPanel>
  <TabPanel value="settings">
    <p>Settings content...</p>
  </TabPanel>
  <TabPanel value="billing">
    <p>Billing content...</p>
  </TabPanel>
</Tabs>
```

## Tabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled active tab |
| `defaultValue` | `string` | - | Initial active tab (uncontrolled) |
| `onChange` | `(value: string) => void` | - | Tab change handler |
| `children` | `ReactNode` | **required** | TabList and TabPanel children |

## Tab Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Tab identifier |
| `children` | `ReactNode` | **required** | Tab label |
| `disabled` | `boolean` | `false` | Disable tab |
| `icon` | `ReactNode` | - | Icon before label |

## TabPanel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Matching tab value |
| `children` | `ReactNode` | **required** | Panel content |

## Examples

### Controlled

```tsx
const [tab, setTab] = useState('home');

<Tabs value={tab} onChange={setTab}>
  <TabList>
    <Tab value="home">Home</Tab>
    <Tab value="profile">Profile</Tab>
  </TabList>
  <TabPanel value="home">Home content</TabPanel>
  <TabPanel value="profile">Profile content</TabPanel>
</Tabs>
```

### With Icons

```tsx
<Tabs defaultValue="files">
  <TabList>
    <Tab value="files" icon={<FileIcon />}>Files</Tab>
    <Tab value="photos" icon={<PhotoIcon />}>Photos</Tab>
  </TabList>
  <TabPanel value="files">...</TabPanel>
  <TabPanel value="photos">...</TabPanel>
</Tabs>
```

### Disabled Tab

```tsx
<Tabs defaultValue="active">
  <TabList>
    <Tab value="active">Active</Tab>
    <Tab value="pending">Pending</Tab>
    <Tab value="archived" disabled>Archived</Tab>
  </TabList>
  ...
</Tabs>
```

### Dynamic Tabs

```tsx
const tabs = [
  { id: 'tab1', label: 'First', content: 'Content 1' },
  { id: 'tab2', label: 'Second', content: 'Content 2' },
];

<Tabs defaultValue={tabs[0].id}>
  <TabList>
    {tabs.map((t) => (
      <Tab key={t.id} value={t.id}>{t.label}</Tab>
    ))}
  </TabList>
  {tabs.map((t) => (
    <TabPanel key={t.id} value={t.id}>{t.content}</TabPanel>
  ))}
</Tabs>
```

## Accessibility

- Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"`
- Arrow key navigation between tabs
- `aria-selected` indicates active tab
- `aria-controls` and `aria-labelledby` connect tabs to panels
- Tab focus moves to panel content when activated
