import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { Button } from '../Button/Button';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const sampleUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', createdAt: '2024-02-20' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', createdAt: '2024-03-10' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active', createdAt: '2024-03-22' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'active', createdAt: '2024-04-05' },
  { id: '6', name: 'Diana Evans', email: 'diana@example.com', role: 'Viewer', status: 'inactive', createdAt: '2024-04-12' },
  { id: '7', name: 'Edward Fox', email: 'edward@example.com', role: 'Editor', status: 'active', createdAt: '2024-04-18' },
  { id: '8', name: 'Fiona Green', email: 'fiona@example.com', role: 'Viewer', status: 'active', createdAt: '2024-04-25' },
  { id: '9', name: 'George Harris', email: 'george@example.com', role: 'Admin', status: 'inactive', createdAt: '2024-05-02' },
  { id: '10', name: 'Helen Irving', email: 'helen@example.com', role: 'Editor', status: 'active', createdAt: '2024-05-10' },
  { id: '11', name: 'Ivan Jackson', email: 'ivan@example.com', role: 'Viewer', status: 'active', createdAt: '2024-05-15' },
  { id: '12', name: 'Julia King', email: 'julia@example.com', role: 'Admin', status: 'active', createdAt: '2024-05-20' },
];

const columns = [
  { id: 'name', header: 'Name', accessor: 'name' as const },
  { id: 'email', header: 'Email', accessor: 'email' as const },
  { id: 'role', header: 'Role', accessor: 'role' as const },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status' as const,
    render: (value: unknown) => (
      <span style={{
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 500,
        background: value === 'active' ? '#dcfce7' : '#f3f4f6',
        color: value === 'active' ? '#166534' : '#6b7280',
      }}>
        {String(value)}
      </span>
    ),
  },
  { id: 'createdAt', header: 'Created', accessor: 'createdAt' as const },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Composite/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: `
A data table with built-in search, pagination, and empty state.

## Quick Start
\`\`\`tsx
import { DataTable } from '@switch/react';

const columns = [
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'email', header: 'Email', accessor: 'email' },
];

<DataTable
  columns={columns}
  data={users}
  searchable
  paginated
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    columns,
    data: sampleUsers.slice(0, 5),
  },
};

export const WithSearch: Story = {
  args: {
    columns,
    data: sampleUsers,
    searchable: true,
    searchPlaceholder: 'Search users...',
    searchFields: ['name', 'email'],
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: sampleUsers,
    paginated: true,
    defaultRowsPerPage: 5,
  },
};

export const FullFeatured: Story = {
  args: {
    columns,
    data: sampleUsers,
    searchable: true,
    searchPlaceholder: 'Search by name or email...',
    searchFields: ['name', 'email'],
    paginated: true,
    defaultRowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    headerActions: (
      <Button size="small">Add User</Button>
    ),
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No users found',
  },
};

export const EmptyWithSearch: Story = {
  args: {
    columns,
    data: sampleUsers,
    searchable: true,
    searchPlaceholder: 'Search users...',
  },
  render: (args) => (
    <DataTable {...args} />
  ),
};

export const WithRowClick: Story = {
  args: {
    columns,
    data: sampleUsers.slice(0, 5),
    onRowClick: (row) => alert(`Clicked: ${row.name}`),
  },
};

export const CustomColumns: Story = {
  args: {
    columns: [
      {
        id: 'user',
        header: 'User',
        accessor: (row: User) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
            }}>
              {row.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>{row.name}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{row.email}</div>
            </div>
          </div>
        ),
      },
      { id: 'role', header: 'Role', accessor: 'role' as const },
      {
        id: 'status',
        header: 'Status',
        accessor: 'status' as const,
        render: (value: unknown) => (
          <span style={{
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500,
            background: value === 'active' ? '#dcfce7' : '#f3f4f6',
            color: value === 'active' ? '#166534' : '#6b7280',
          }}>
            {String(value)}
          </span>
        ),
      },
      {
        id: 'actions',
        header: '',
        accessor: () => (
          <Button variant="outline" size="small">Edit</Button>
        ),
      },
    ],
    data: sampleUsers.slice(0, 5),
  },
};
