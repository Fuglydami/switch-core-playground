# Switch Design System - Component Catalog

> This file is optimized for LLM consumption. Use these components when building UI for Switch/Interswitch products.

## Installation

```bash
pnpm add @switch/react
```

## Import

```tsx
import { Button, Input, Card, Modal, ... } from '@switch/react';
```

---

## Components

### Button

Triggers actions. Use for primary CTAs, form submissions, and interactive elements.

```tsx
import { Button } from '@switch/react';

<Button
  variant="primary" | "secondary" | "tertiary" | "outline" | "link" | "tonal"
  colorScheme="popBlue" | "activeBlue" | "primaryBlue" | "monochrome"
  size="small" | "medium" | "large"
  shape="rectangular" | "pill" | "square" | "circle"
  isLoading={boolean}
  disabled={boolean}
  fullWidth={boolean}
  leftIcon={ReactNode}
  rightIcon={ReactNode}
  onPress={() => void}
>
  Label
</Button>
```

**Defaults:** `variant="primary"`, `colorScheme="activeBlue"`, `size="large"`, `shape="rectangular"`

---

### Input

Text input with label, validation states, and icons.

```tsx
import { Input } from '@switch/react';

<Input
  label="Email"
  placeholder="you@example.com"
  value={string}
  onChange={(e) => void}
  helperText="Optional helper text"
  size="small" | "medium" | "large"
  isError={boolean}
  errorMessage="Error message"
  isSuccess={boolean}
  successMessage="Success message"
  isWarning={boolean}
  warningMessage="Warning message"
  leadingIcon={ReactNode}
  trailingIcon={ReactNode}
  fullWidth={boolean}
  disabled={boolean}
/>
```

---

### Select

Dropdown selection (web only).

```tsx
import { Select } from '@switch/react';

<Select
  label="Country"
  placeholder="Select a country"
  value={string}
  onChange={(e) => void}
  options={[
    { label: 'Nigeria', value: 'ng' },
    { label: 'Ghana', value: 'gh' },
  ]}
  disabled={boolean}
/>
```

---

### Card

Container for grouped content.

```tsx
import { Card } from '@switch/react';

<Card
  variant="elevated" | "outlined" | "filled"
  padding="none" | "small" | "medium" | "large"
  onClick={() => void}
>
  {children}
</Card>
```

---

### Modal

Dialog overlay for focused tasks.

```tsx
import { Modal } from '@switch/react';

<Modal
  isOpen={boolean}
  onClose={() => void}
  title="Modal Title"
  size="small" | "medium" | "large"
  closeOnOverlayClick={boolean}
>
  {children}
</Modal>

// With footer actions
<Modal isOpen={isOpen} onClose={onClose} title="Confirm">
  <p>Are you sure?</p>
  <Modal.Footer>
    <Button variant="outline" onPress={onClose}>Cancel</Button>
    <Button onPress={handleConfirm}>Confirm</Button>
  </Modal.Footer>
</Modal>
```

---

### Toast

Temporary notifications.

```tsx
import { Toast, ToastProvider, useToast } from '@switch/react';

// Wrap app with provider
<ToastProvider>
  <App />
</ToastProvider>

// Use hook to show toasts
const { showToast } = useToast();

showToast({
  title: 'Success',
  description: 'Your changes have been saved.',
  variant: 'success' | 'error' | 'warning' | 'info',
  duration: 5000,
});
```

---

### Alert

Inline feedback messages.

```tsx
import { Alert } from '@switch/react';

<Alert
  variant="info" | "success" | "warning" | "error"
  title="Optional title"
  onClose={() => void}
>
  Alert message content
</Alert>
```

---

### Avatar

User or entity representation.

```tsx
import { Avatar } from '@switch/react';

<Avatar
  src="/path/to/image.jpg"
  alt="User name"
  name="John Doe"  // Fallback initials
  size="xsmall" | "small" | "medium" | "large" | "xlarge"
  shape="circle" | "square"
  status="online" | "offline" | "busy" | "away"
/>
```

---

### Chip

Compact elements for tags, filters, or selections.

```tsx
import { Chip } from '@switch/react';

<Chip
  variant="filled" | "outlined"
  colorScheme="neutral" | "blue" | "green" | "red" | "yellow"
  size="small" | "medium"
  onRemove={() => void}
  selected={boolean}
>
  Label
</Chip>
```

---

### Tabs

Navigation between related content panels.

```tsx
import { Tabs } from '@switch/react';

<Tabs
  items={[
    { id: 'tab1', label: 'Overview', content: <Overview /> },
    { id: 'tab2', label: 'Details', content: <Details /> },
    { id: 'tab3', label: 'Settings', content: <Settings />, disabled: true },
  ]}
  defaultActiveId="tab1"
  variant="underline" | "pills" | "enclosed"
  onChange={(id) => void}
/>
```

---

### Table

Data display in rows and columns.

```tsx
import { Table } from '@switch/react';

<Table
  columns={[
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'status', header: 'Status', accessor: 'status', render: (val) => <Chip>{val}</Chip> },
  ]}
  data={[
    { name: 'John', email: 'john@example.com', status: 'Active' },
  ]}
  onRowClick={(row) => void}
  selectable={boolean}
  onSelectionChange={(selectedRows) => void}
/>
```

---

### Accordion

Expandable content sections.

```tsx
import { Accordion } from '@switch/react';

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <p>Content 1</p> },
    { id: '2', title: 'Section 2', content: <p>Content 2</p> },
  ]}
  allowMultiple={boolean}
  defaultExpandedIds={['1']}
/>
```

---

### Menu

Dropdown menu for actions.

```tsx
import { Menu } from '@switch/react';

<Menu
  trigger={<Button>Actions</Button>}
  items={[
    { id: 'edit', label: 'Edit', onClick: handleEdit },
    { id: 'delete', label: 'Delete', onClick: handleDelete, destructive: true },
  ]}
  placement="bottom-start" | "bottom-end" | "top-start" | "top-end"
/>
```

---

### Tooltip

Contextual information on hover.

```tsx
import { Tooltip } from '@switch/react';

<Tooltip content="Helpful information" placement="top" | "bottom" | "left" | "right">
  <Button>Hover me</Button>
</Tooltip>
```

---

### Loader

Loading indicators.

```tsx
import { Loader } from '@switch/react';

<Loader
  size="small" | "medium" | "large"
  variant="spinner" | "dots" | "pulse"
/>
```

---

### EmptyState

Placeholder for empty content areas.

```tsx
import { EmptyState } from '@switch/react';

<EmptyState
  icon={<IconInbox />}
  title="No messages"
  description="You don't have any messages yet."
  action={<Button>Compose</Button>}
/>
```

---

### Divider

Visual separator.

```tsx
import { Divider } from '@switch/react';

<Divider orientation="horizontal" | "vertical" />
```

---

### HelperText

Form field helper/error text.

```tsx
import { HelperText } from '@switch/react';

<HelperText variant="default" | "error" | "success" | "warning">
  Helper message
</HelperText>
```

---

### Slider

Range input control.

```tsx
import { Slider } from '@switch/react';

<Slider
  min={0}
  max={100}
  value={50}
  onChange={(value) => void}
  step={1}
  showValue={boolean}
  disabled={boolean}
/>
```

---

### DatePicker

Date selection input.

```tsx
import { DatePicker } from '@switch/react';

<DatePicker
  label="Start date"
  value={Date}
  onChange={(date) => void}
  minDate={Date}
  maxDate={Date}
  placeholder="Select date"
/>
```

---

### Upload

File upload with drag-and-drop.

```tsx
import { Upload } from '@switch/react';

<Upload
  accept="image/*,.pdf"
  multiple={boolean}
  maxSize={5 * 1024 * 1024} // 5MB
  files={uploadFiles}
  onFilesAdded={(files) => void}
  onRemove={(id) => void}
  onRetry={(id) => void}
  disabled={boolean}
/>
```

---

### Controls (Checkbox, Radio, Switch)

Form selection controls.

```tsx
import { Checkbox, Radio, Switch } from '@switch/react';

<Checkbox
  checked={boolean}
  onChange={(checked) => void}
  label="Accept terms"
  disabled={boolean}
/>

<Radio
  checked={boolean}
  onChange={() => void}
  label="Option A"
  name="group"
  value="a"
/>

<Switch
  checked={boolean}
  onChange={(checked) => void}
  label="Enable notifications"
  disabled={boolean}
/>
```

---

### SideNav

Sidebar navigation.

```tsx
import { SideNav } from '@switch/react';

<SideNav
  items={[
    { id: 'dashboard', label: 'Dashboard', icon: <IconHome />, href: '/' },
    { id: 'users', label: 'Users', icon: <IconUsers />, href: '/users' },
    {
      id: 'settings',
      label: 'Settings',
      icon: <IconSettings />,
      children: [
        { id: 'general', label: 'General', href: '/settings/general' },
        { id: 'security', label: 'Security', href: '/settings/security' },
      ],
    },
  ]}
  activeId="dashboard"
  collapsed={boolean}
  onNavigate={(id) => void}
/>
```

---

### BottomNav

Mobile bottom navigation.

```tsx
import { BottomNav } from '@switch/react';

<BottomNav
  items={[
    { id: 'home', label: 'Home', icon: <IconHome /> },
    { id: 'search', label: 'Search', icon: <IconSearch /> },
    { id: 'messages', label: 'Messages', icon: <IconMessage />, badge: 5 },
    { id: 'profile', label: 'Profile', icon: <IconUser /> },
  ]}
  activeId="home"
  variant="outline" | "fill" | "outline-fill"
  onChange={(id) => void}
/>
```

---

### AppBar

Top app bar with navigation and actions.

```tsx
import { AppBar } from '@switch/react';

<AppBar
  title="Page Title"
  subtitle="Optional subtitle"
  variant="light" | "dark" | "transparent"
  leftAction={{ icon: <IconMenu />, onClick: toggleSidebar, label: 'Menu' }}
  rightActions={[
    { icon: <IconBell />, onClick: openNotifications, label: 'Notifications', badge: 3 },
    { icon: <IconUser />, onClick: openProfile, label: 'Profile' },
  ]}
  sticky={boolean}
/>
```

---

### Breadcrumb

Navigation path indicator.

```tsx
import { Breadcrumb } from '@switch/react';

<Breadcrumb
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'current', label: 'Product Details' },
  ]}
  maxItems={3}  // Collapses middle items
  onNavigate={(item) => void}
/>
```

---

### Header

Page header with title and actions.

```tsx
import { Header } from '@switch/react';

<Header
  title="Users"
  subtitle="Manage your team members"
  actions={<Button>Add User</Button>}
  breadcrumbs={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'users', label: 'Users' },
  ]}
/>
```

---

### ListItem

List item for menus and selections.

```tsx
import { ListItem } from '@switch/react';

<ListItem
  title="Item title"
  description="Optional description"
  leftElement={<Avatar name="John" />}
  rightElement={<Chip>New</Chip>}
  onClick={() => void}
  selected={boolean}
  disabled={boolean}
/>
```

---

## Design Tokens

Primary colors:
- `--switch-color-activeblue-400` (#0275d8) - Primary interactive color
- `--switch-color-popblue-400` - Accent blue
- `--switch-color-primaryblue-400` - Brand blue

Status colors:
- `--switch-color-activegreen-500` - Success
- `--switch-color-primaryred-500` - Error
- `--switch-color-activeyellow-500` - Warning

Neutral colors:
- `--switch-color-neutral-900` - Primary text
- `--switch-color-neutral-600` - Secondary text
- `--switch-color-neutral-200` - Borders
- `--switch-color-neutral-100` - Backgrounds

---

## Usage Guidelines

1. **Always use design system components** - Don't create custom buttons, inputs, etc.
2. **Follow the prop patterns** - Use the documented variants, sizes, and color schemes
3. **Maintain consistency** - Use the same variant/size combinations across similar contexts
4. **Accessibility** - All components have built-in a11y; don't override aria attributes
