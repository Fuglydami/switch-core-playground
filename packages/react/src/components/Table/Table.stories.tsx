import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table, SortDirection } from './Table';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Pending' },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  args: {
    columns,
    data,
    rowKey: 'id',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {};

export const Striped: Story = {
  args: {
    striped: true,
  },
};

export const Bordered: Story = {
  args: {
    bordered: true,
  },
};

export const Dense: Story = {
  args: {
    dense: true,
  },
};

export const ClickableRows: Story = {
  args: {
    onRowPress: (row) => alert(`Clicked: ${row.name}`),
  },
};

export const Empty: Story = {
  args: {
    data: [],
    emptyMessage: 'No users found',
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<SortDirection>('none');

    const sortedData = [...data].sort((a, b) => {
      if (!sortKey || sortDir === 'none') return 0;
      const aVal = a[sortKey as keyof typeof a];
      const bVal = b[sortKey as keyof typeof b];
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return (
      <Table
        columns={columns}
        data={sortedData}
        rowKey="id"
        sortKey={sortKey}
        sortDirection={sortDir}
        onSort={(key, dir) => {
          setSortKey(key);
          setSortDir(dir);
        }}
      />
    );
  },
};

export const CustomCells: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      {
        key: 'status',
        header: 'Status',
        render: (value) => (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 12,
              fontSize: 12,
              background: value === 'Active' ? '#D1FAE5' : value === 'Inactive' ? '#FEE2E2' : '#FEF3C7',
              color: value === 'Active' ? '#065F46' : value === 'Inactive' ? '#991B1B' : '#92400E',
            }}
          >
            {String(value)}
          </span>
        ),
      },
    ],
  },
};
