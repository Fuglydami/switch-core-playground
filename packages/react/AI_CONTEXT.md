# Switch Design System - AI Context

> Optimized reference for LLMs generating UI code. Always import from `@switch/react`.

## Quick Start

```tsx
import '@switch/react/styles'; // In app entry point
import { Button, Input, Card } from '@switch/react';
```

---

## Component Signatures

### Buttons & Actions

```tsx
// Button - All interactive actions
<Button
  variant="primary" | "secondary" | "tertiary" | "outline" | "link"  // default: "primary"
  colorScheme="activeBlue" | "popBlue" | "primaryBlue" | "monochrome"  // default: "activeBlue"
  size="small" | "medium" | "large"  // default: "large"
  shape="rectangular" | "pill" | "square" | "circle"  // default: "rectangular"
  isLoading={boolean}
  disabled={boolean}
  fullWidth={boolean}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  onPress={() => {}}
>
  Label
</Button>
```

### Form Inputs

```tsx
// Input - Text fields
<Input
  label="Label"
  placeholder="Placeholder"
  value={string}
  onChange={(e) => e.target.value}
  size="small" | "medium" | "large"
  isError={boolean} errorMessage="Error text"
  isSuccess={boolean} successMessage="Success text"
  isWarning={boolean} warningMessage="Warning text"
  helperText="Helper text"
  leadingIcon={<Icon />}
  trailingIcon={<Icon />}
  fullWidth={boolean}
  disabled={boolean}
/>

// Select - Dropdowns
<Select
  label="Label"
  placeholder="Select..."
  value={string}
  onChange={(e) => e.target.value}
  options={[{ label: "Display", value: "val" }]}
/>

// SearchInput - With debounce & clear
<SearchInput
  placeholder="Search..."
  onSearch={(query) => {}}  // Debounced
  onChange={(query) => {}}  // Immediate
  debounceMs={300}
  isLoading={boolean}
/>

// FormField - Input with label + error handling
<FormField
  name="fieldName"
  label="Label"
  type="text" | "email" | "password" | "number" | "tel" | "select"
  placeholder="Placeholder"
  value={string}
  onChange={(e) => {}}
  error="Error message"
  required={boolean}
  options={[]}  // For type="select"
/>
```

### Form with Validation

```tsx
import { Form, validators } from '@switch/react';

<Form
  initialValues={{ email: '', password: '' }}
  onSubmit={async (values) => { /* handle submit */ }}
>
  <Form.Field
    name="email"
    label="Email"
    type="email"
    rules={[validators.required(), validators.email()]}
    fullWidth
  />
  <Form.Field
    name="password"
    label="Password"
    type="password"
    rules={[validators.required(), validators.minLength(8)]}
    fullWidth
  />
  <Form.Submit>
    <Button type="submit" fullWidth>Submit</Button>
  </Form.Submit>
</Form>

// Available validators:
validators.required(message?)
validators.email(message?)
validators.minLength(n, message?)
validators.maxLength(n, message?)
validators.pattern(regex, message)
validators.match(fieldName, message?)
validators.phone(message?)
validators.number(message?)
validators.min(n, message?)
validators.max(n, message?)
```

### Selection Controls

```tsx
<Checkbox checked={boolean} onChange={(checked) => {}} label="Label" />
<Radio checked={boolean} onChange={() => {}} label="Label" name="group" value="val" />
<Switch checked={boolean} onChange={(checked) => {}} label="Label" />
<Slider min={0} max={100} value={50} onChange={(val) => {}} step={1} />
```

### Layout & Containers

```tsx
// Card
<Card variant="elevated" | "outlined" | "filled" padding="none" | "small" | "medium" | "large">
  {children}
</Card>

// Modal
<Modal isOpen={boolean} onClose={() => {}} title="Title" size="small" | "medium" | "large">
  {children}
</Modal>

// ConfirmModal - Pre-built confirmation dialog
<ConfirmModal
  isOpen={boolean}
  onClose={() => {}}
  onConfirm={() => {}}
  title="Confirm Action"
  description="Are you sure?"
  variant="primary" | "danger"
  confirmText="Confirm"
  cancelText="Cancel"
  isLoading={boolean}
/>

// Accordion
<Accordion
  items={[{ id: "1", title: "Section", content: <div>Content</div> }]}
  allowMultiple={boolean}
  defaultExpandedIds={["1"]}
/>

// Tabs
<Tabs
  items={[{ id: "tab1", label: "Tab", content: <div>Content</div> }]}
  variant="underline" | "pills" | "enclosed"
/>

// Divider
<Divider orientation="horizontal" | "vertical" />
```

### Data Display

```tsx
// Table - Basic
<Table
  columns={[{ id: "col", header: "Column", accessor: "field", render: (val, row) => <span>{val}</span> }]}
  data={[{ id: "1", field: "value" }]}
  onRowClick={(row) => {}}
  selectable={boolean}
/>

// DataTable - Full-featured (search, pagination, loading)
<DataTable
  columns={[{ id, header, accessor, render?, sortable? }]}
  data={[]}
  searchable={boolean}
  searchPlaceholder="Search..."
  searchFields={["name", "email"]}  // Which fields to search
  paginated={boolean}
  rowsPerPageOptions={[10, 25, 50]}
  isLoading={boolean}
  emptyMessage="No data found"
  headerActions={<Button>Add</Button>}
  onRowClick={(row) => {}}
/>

// Avatar
<Avatar
  src="/image.jpg"
  name="John Doe"  // Fallback initials
  size="xsmall" | "small" | "medium" | "large" | "xlarge"
  shape="circle" | "square"
  status="online" | "offline" | "busy" | "away"
/>

// Chip
<Chip
  variant="filled" | "outlined"
  colorScheme="neutral" | "blue" | "green" | "red" | "yellow"
  size="small" | "medium"
  onRemove={() => {}}
>
  Label
</Chip>

// ListItem
<ListItem
  title="Title"
  description="Description"
  leftElement={<Avatar />}
  rightElement={<Chip>New</Chip>}
  onClick={() => {}}
/>
```

### Feedback

```tsx
// Alert - Inline messages
<Alert variant="info" | "success" | "warning" | "error" title="Title" onClose={() => {}}>
  Message
</Alert>

// Toast - Temporary notifications (wrap app in ToastProvider)
const { showToast } = useToast();
showToast({ title: "Success", description: "Done!", variant: "success" | "error" | "warning" | "info", duration: 5000 });

// Loader
<Loader size="small" | "medium" | "large" variant="spinner" | "dots" | "pulse" />

// EmptyState
<EmptyState icon={<Icon />} title="No data" description="Try again" action={<Button>Retry</Button>} />

// Tooltip
<Tooltip content="Hint text" placement="top" | "bottom" | "left" | "right">
  <Button>Hover me</Button>
</Tooltip>
```

### Navigation

```tsx
// PageHeader - Page title with breadcrumbs & actions
<PageHeader
  title="Page Title"
  subtitle="Description"
  breadcrumbs={[{ id: "home", label: "Home", href: "/" }, { id: "current", label: "Current" }]}
  actions={<Button>Action</Button>}
  onBack={() => {}}
/>

// Breadcrumb
<Breadcrumb items={[{ id: "1", label: "Home", href: "/" }, { id: "2", label: "Current" }]} />

// SideNav
<SideNav
  items={[{ id: "home", label: "Home", icon: <Icon />, href: "/" }]}
  activeId="home"
  collapsed={boolean}
/>

// BottomNav - Mobile
<BottomNav
  items={[{ id: "home", label: "Home", icon: <Icon />, badge: 5 }]}
  activeId="home"
  variant="outline" | "fill" | "outline-fill"
/>

// AppBar
<AppBar
  title="Title"
  variant="light" | "dark" | "transparent"
  leftAction={{ icon: <Icon />, onClick: () => {}, label: "Menu" }}
  rightActions={[{ icon: <Icon />, onClick: () => {}, badge: 3 }]}
/>

// Menu - Dropdown
<Menu
  trigger={<Button>Menu</Button>}
  items={[{ id: "edit", label: "Edit", onClick: () => {} }]}
/>
```

### File Upload

```tsx
<Upload
  accept="image/*,.pdf"
  multiple={boolean}
  maxSize={5 * 1024 * 1024}  // 5MB
  files={[{ id, name, size, status: "idle" | "uploading" | "completed" | "failed", progress?, errorMessage? }]}
  onFilesAdded={(files) => {}}
  onRemove={(id) => {}}
  onRetry={(id) => {}}
/>
```

---

## Common Patterns

### Login Form
```tsx
<Card padding="large" style={{ maxWidth: 400 }}>
  <Form onSubmit={handleLogin}>
    <Form.Field name="email" label="Email" type="email" rules={[validators.required(), validators.email()]} fullWidth />
    <Form.Field name="password" label="Password" type="password" rules={[validators.required()]} fullWidth />
    <Form.Submit><Button type="submit" fullWidth>Sign In</Button></Form.Submit>
  </Form>
</Card>
```

### Data Table Page
```tsx
<PageHeader title="Users" actions={<Button>Add User</Button>} />
<DataTable
  columns={[
    { id: "name", header: "Name", accessor: "name" },
    { id: "status", header: "Status", accessor: "status", render: (v) => <Chip colorScheme={v === "Active" ? "green" : "red"}>{v}</Chip> }
  ]}
  data={users}
  searchable
  paginated
/>
```

### Confirmation Flow
```tsx
const [showConfirm, setShowConfirm] = useState(false);

<Button onPress={() => setShowConfirm(true)}>Delete</Button>
<ConfirmModal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  description="This cannot be undone."
  variant="danger"
/>
```

### Settings Page with Tabs
```tsx
<Tabs items={[
  { id: "profile", label: "Profile", content: <ProfileForm /> },
  { id: "notifications", label: "Notifications", content: <NotificationSettings /> },
  { id: "security", label: "Security", content: <SecuritySettings /> },
]} />
```

---

## Do's and Don'ts

### DO
- Always import from `@switch/react`
- Use `Form` with `validators` for form validation
- Use `DataTable` for tables with search/pagination
- Use `ConfirmModal` for destructive actions
- Use `PageHeader` for page titles with breadcrumbs
- Use semantic `colorScheme` for status (green=success, red=error, yellow=warning)

### DON'T
- Don't create custom buttons, inputs, or cards
- Don't use inline styles for component styling
- Don't use other UI libraries (MUI, Chakra, etc.)
- Don't hardcode colors - use colorScheme props
- Don't build custom modals - use Modal or ConfirmModal
