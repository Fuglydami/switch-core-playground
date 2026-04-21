# Table

Data table component with sorting, custom cell rendering, and row interaction.

## Import

```tsx
// React (web)
import { Table } from '@switch/react';

// React Native
import { Table } from '@switch/react-native';
```

## Usage

```tsx
const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

<Table columns={columns} data={data} rowKey="id" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | **required** | Column definitions |
| `data` | `T[]` | **required** | Row data array |
| `rowKey` | `keyof T \| (row, index) => string` | - | Unique key for each row |
| `onRowPress` | `(row: T, index: number) => void` | - | Row click handler |
| `striped` | `boolean` | `false` | Zebra-stripe rows |
| `bordered` | `boolean` | `false` | Show borders between cells |
| `dense` | `boolean` | `false` | Compact padding |
| `emptyMessage` | `ReactNode` | `'No data available.'` | Empty state content |
| `sortKey` | `string` | - | Currently sorted column key |
| `sortDirection` | `'asc' \| 'desc' \| 'none'` | `'none'` | Sort direction |
| `onSort` | `(key: string, direction: SortDirection) => void` | - | Sort change handler |
| `horizontal` | `boolean` | `false` | Enable horizontal scroll (RN) |

### TableColumn

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Data property key |
| `header` | `ReactNode` | Column header content |
| `render` | `(value, row, rowIndex) => ReactNode` | Custom cell renderer |
| `sortable` | `boolean` | Enable sorting on this column |
| `width` | `number` | Fixed column width |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment |

## Examples

### Sortable Columns

```tsx
const [sortKey, setSortKey] = useState<string>();
const [sortDir, setSortDir] = useState<SortDirection>('none');

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'date', header: 'Date', sortable: true },
];

<Table
  columns={columns}
  data={data}
  sortKey={sortKey}
  sortDirection={sortDir}
  onSort={(key, dir) => {
    setSortKey(key);
    setSortDir(dir);
  }}
/>
```

### Custom Cell Renderer

```tsx
const columns = [
  { key: 'name', header: 'Name' },
  {
    key: 'status',
    header: 'Status',
    render: (value) => <Chip variant={value === 'active' ? 'success' : 'neutral'}>{value}</Chip>,
  },
];
```

### Clickable Rows

```tsx
<Table
  columns={columns}
  data={data}
  onRowPress={(row) => navigate(`/users/${row.id}`)}
/>
```

### Styled Variants

```tsx
// Zebra stripes
<Table columns={columns} data={data} striped />

// Bordered cells
<Table columns={columns} data={data} bordered />

// Compact
<Table columns={columns} data={data} dense />
```

### Custom Empty State

```tsx
<Table
  columns={columns}
  data={[]}
  emptyMessage={<EmptyState title="No users found" />}
/>
```

## Accessibility

- Uses semantic table markup (web) or accessible View structure (RN)
- Sortable columns have `accessibilityLabel` describing sort action
- Clickable rows have `role="button"` and keyboard support
