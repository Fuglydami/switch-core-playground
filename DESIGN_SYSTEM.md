# Switch Design System - Vibe Coding Guide

> **Copy this file into your project root to enable AI-assisted UI development with the Interswitch design system.**

## Quick Start (2 minutes)

```bash
# 1. Install the design system
npm install switch-core-react

# 2. Copy this file to your project root as CLAUDE.md (or .cursorrules for Cursor)
# 3. Start prompting! "Build me a dashboard with a sidebar and data table"
```

## AI Instructions

**ALWAYS use `switch-core-react` components for UI.** Never create custom implementations.

```tsx
import {
  // Layout & Navigation
  AppBar, SideNav, BottomNav, Header, Breadcrumb,

  // Content
  Card, Accordion, Tabs, Table, ListItem, Divider, EmptyState,

  // Forms
  Button, Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, Upload,

  // Feedback
  Modal, Toast, ToastProvider, useToast, Alert, Loader, HelperText,

  // Display
  Avatar, Chip, Tooltip, Menu,
} from 'switch-core-react';
```

---

## Component Quick Reference

### Button
```tsx
<Button
  variant="primary" | "secondary" | "tertiary" | "outline" | "link" | "tonal"
  colorScheme="popBlue" | "activeBlue" | "primaryBlue" | "monochrome"
  size="small" | "medium" | "large"
  shape="rectangular" | "pill" | "square" | "circle"
  isLoading={boolean}
  disabled={boolean}
  fullWidth={boolean}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  onPress={() => {}}
>
  Label
</Button>

// Tonal variant - medium opacity background with white text
<Button variant="tonal" colorScheme="activeBlue" leftIcon={<ClockIcon />} rightIcon={<ArrowIcon />}>
  Label
</Button>
```

### Input
```tsx
<Input
  label="Email"
  placeholder="you@example.com"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  helperText="We'll never share your email"
  isError={boolean}
  errorMessage="Invalid email"
  isSuccess={boolean}
  successMessage="Looks good!"
  leadingIcon={<Icon />}
  trailingIcon={<Icon />}
  fullWidth={boolean}
  disabled={boolean}
/>
```

### Select
```tsx
<Select
  label="Country"
  placeholder="Select a country"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={[
    { label: 'Nigeria', value: 'ng' },
    { label: 'Ghana', value: 'gh' },
    { label: 'Kenya', value: 'ke' },
  ]}
/>
```

### Card
```tsx
<Card
  variant="elevated" | "outlined" | "filled"
  padding="none" | "small" | "medium" | "large"
  onClick={() => {}}
>
  {children}
</Card>
```

### Modal
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="small" | "medium" | "large"
>
  <p>Are you sure you want to continue?</p>
  <Modal.Footer>
    <Button variant="outline" onPress={() => setIsOpen(false)}>Cancel</Button>
    <Button onPress={handleConfirm}>Confirm</Button>
  </Modal.Footer>
</Modal>
```

### Toast (Notifications)
```tsx
// 1. Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// 2. Use the hook
const { showToast } = useToast();

showToast({
  title: 'Success!',
  description: 'Your changes have been saved.',
  variant: 'success' | 'error' | 'warning' | 'info',
  duration: 5000,
});
```

### Alert
```tsx
<Alert
  variant="info" | "success" | "warning" | "error"
  title="Important Notice"
  onClose={() => {}}
>
  Your session will expire in 5 minutes.
</Alert>
```

### Table
```tsx
<Table
  columns={[
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'status', header: 'Status', accessor: 'status',
      render: (val) => <Chip colorScheme={val === 'Active' ? 'green' : 'red'}>{val}</Chip>
    },
  ]}
  data={[
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ]}
  onRowClick={(row) => console.log(row)}
  selectable={boolean}
/>
```

### Tabs
```tsx
<Tabs
  items={[
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'details', label: 'Details', content: <Details /> },
    { id: 'settings', label: 'Settings', content: <Settings /> },
  ]}
  defaultActiveId="overview"
  variant="underline" | "pills" | "enclosed"
/>
```

### SideNav (Sidebar)
```tsx
<SideNav
  items={[
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon />, href: '/' },
    { id: 'users', label: 'Users', icon: <UsersIcon />, href: '/users' },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      children: [
        { id: 'general', label: 'General', href: '/settings/general' },
        { id: 'security', label: 'Security', href: '/settings/security' },
      ],
    },
  ]}
  activeId="dashboard"
  collapsed={boolean}
/>
```

### AppBar (Top Navigation)
```tsx
<AppBar
  title="Dashboard"
  subtitle="Welcome back, John"
  variant="light" | "dark" | "transparent"
  leftAction={{ icon: <MenuIcon />, onClick: toggleSidebar, label: 'Menu' }}
  rightActions={[
    { icon: <BellIcon />, onClick: openNotifications, label: 'Notifications', badge: 3 },
    { icon: <UserIcon />, onClick: openProfile, label: 'Profile' },
  ]}
  sticky={true}
/>
```

### BottomNav (Mobile)
```tsx
<BottomNav
  items={[
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'search', label: 'Search', icon: <SearchIcon /> },
    { id: 'messages', label: 'Messages', icon: <MessageIcon />, badge: 5 },
    { id: 'profile', label: 'Profile', icon: <UserIcon /> },
  ]}
  activeId="home"
  onChange={(id) => navigate(id)}
/>
```

### Avatar
```tsx
<Avatar
  src="/path/to/image.jpg"
  alt="John Doe"
  name="John Doe"  // Shows initials if no image
  size="xsmall" | "small" | "medium" | "large" | "xlarge"
  shape="circle" | "square"
  status="online" | "offline" | "busy" | "away"
/>
```

### Chip (Tags/Badges)
```tsx
<Chip
  variant="filled" | "outlined"
  colorScheme="neutral" | "blue" | "green" | "red" | "yellow"
  size="small" | "medium"
  onRemove={() => {}}
  selected={boolean}
>
  Label
</Chip>
```

### Menu (Dropdown)
```tsx
<Menu
  trigger={<Button>Actions</Button>}
  items={[
    { id: 'edit', label: 'Edit', onClick: handleEdit },
    { id: 'duplicate', label: 'Duplicate', onClick: handleDuplicate },
    { id: 'separator', label: '' },
    { id: 'delete', label: 'Delete', onClick: handleDelete, destructive: true },
  ]}
  placement="bottom-start" | "bottom-end"
/>
```

### Form Controls
```tsx
<Checkbox
  checked={checked}
  onChange={(checked) => setChecked(checked)}
  label="Accept terms and conditions"
/>

<Radio
  checked={selected === 'a'}
  onChange={() => setSelected('a')}
  label="Option A"
  name="options"
  value="a"
/>

<Switch
  checked={enabled}
  onChange={(enabled) => setEnabled(enabled)}
  label="Enable notifications"
/>

<Slider
  min={0}
  max={100}
  value={value}
  onChange={(value) => setValue(value)}
  showValue={true}
/>

<DatePicker
  label="Start Date"
  value={date}
  onChange={(date) => setDate(date)}
  minDate={new Date()}
/>

<Upload
  accept="image/*,.pdf"
  multiple={true}
  maxSize={5 * 1024 * 1024}
  files={files}
  onFilesAdded={(newFiles) => setFiles([...files, ...newFiles])}
  onRemove={(id) => setFiles(files.filter(f => f.id !== id))}
/>
```

### Other Components
```tsx
<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <p>Content here</p> },
    { id: '2', title: 'Section 2', content: <p>More content</p> },
  ]}
  allowMultiple={true}
/>

<Tooltip content="Helpful information" placement="top">
  <Button>Hover me</Button>
</Tooltip>

<Loader size="small" | "medium" | "large" variant="spinner" | "dots" | "pulse" />

<EmptyState
  icon={<InboxIcon />}
  title="No messages"
  description="You don't have any messages yet."
  action={<Button>Compose</Button>}
/>

<Divider orientation="horizontal" | "vertical" />

<HelperText variant="default" | "error" | "success" | "warning">
  Helper message here
</HelperText>

<Breadcrumb
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'current', label: 'Product Details' },
  ]}
/>

<Header
  title="Users"
  subtitle="Manage your team"
  actions={<Button>Add User</Button>}
/>

<ListItem
  title="John Doe"
  description="Software Engineer"
  leftElement={<Avatar name="John Doe" />}
  rightElement={<Chip>Admin</Chip>}
  onClick={() => {}}
/>
```

---

## Common Patterns

### Dashboard Layout
```tsx
<div style={{ display: 'flex', minHeight: '100vh' }}>
  <SideNav items={navItems} activeId={currentPage} />
  <main style={{ flex: 1, padding: '24px' }}>
    <Header title="Dashboard" actions={<Button>Export</Button>} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <Card><StatCard title="Revenue" value="$12,345" /></Card>
      <Card><StatCard title="Users" value="1,234" /></Card>
      <Card><StatCard title="Orders" value="567" /></Card>
    </div>
    <Card style={{ marginTop: '24px' }}>
      <Table columns={columns} data={data} />
    </Card>
  </main>
</div>
```

### Login Form
```tsx
<Card padding="large" style={{ maxWidth: '400px', margin: '100px auto' }}>
  <h1>Sign In</h1>
  <Input label="Email" type="email" fullWidth />
  <Input label="Password" type="password" fullWidth style={{ marginTop: '16px' }} />
  <Checkbox label="Remember me" style={{ marginTop: '16px' }} />
  <Button fullWidth style={{ marginTop: '24px' }}>Sign In</Button>
  <Button variant="link" fullWidth style={{ marginTop: '8px' }}>Forgot password?</Button>
</Card>
```

### Settings Page
```tsx
<>
  <Header title="Settings" />
  <Tabs
    items={[
      {
        id: 'profile',
        label: 'Profile',
        content: (
          <Card>
            <Input label="Name" defaultValue="John Doe" fullWidth />
            <Input label="Email" defaultValue="john@example.com" fullWidth />
            <Button style={{ marginTop: '16px' }}>Save Changes</Button>
          </Card>
        ),
      },
      {
        id: 'notifications',
        label: 'Notifications',
        content: (
          <Card>
            <Switch label="Email notifications" />
            <Switch label="Push notifications" />
            <Switch label="SMS notifications" />
          </Card>
        ),
      },
    ]}
  />
</>
```

---

## Resources

- **Storybook:** https://main--69e7740643766d793dd9a5ca.chromatic.com
- **Playground:** https://switch-core-playground.vercel.app
- **Figma:** https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core
- **npm:** `npm install switch-core-react`

---

## Rules for AI

1. **ALWAYS use switch-core-react** - Never create custom buttons, inputs, cards, modals, etc.
2. **Use the documented props** - Don't invent prop names; use what's shown above
3. **Match variants consistently** - Use the same size/variant across similar elements
4. **Wrap app with ToastProvider** - Required for toast notifications
5. **Use Card for containers** - Don't create custom card-like divs
6. **Use Table for data** - Don't create custom table implementations
7. **Use Modal for dialogs** - Don't create custom modal/popup implementations
