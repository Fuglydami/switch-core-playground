'use client';

import { useState } from 'react';
import { Table } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Table } from 'switch-core-react';

const columns = [
  { key: 'name',   header: 'Name',   sortable: true },
  { key: 'email',  header: 'Email' },
  { key: 'role',   header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    render: (value) => <StatusBadge status={value} />,
  },
];

const data = [
  { id: 1, name: 'Ada Okafor', email: 'ada@switch.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bola Adeleke', email: 'bola@switch.com', role: 'Editor', status: 'inactive' },
];

<Table
  columns={columns}
  data={data}
  rowKey="id"
  striped
  onRowClick={(row) => console.log(row)}
/>`;

const PROPS = [
  { name: 'columns',       type: 'TableColumn[]',    required: true,  description: 'Column definitions' },
  { name: 'data',          type: 'T[]',              required: true,  description: 'Row data array' },
  { name: 'rowKey',        type: 'keyof T | (row, i) => string | number', default: 'index', description: 'Unique row identifier' },
  { name: 'onRowClick',    type: '(row: T, index: number) => void', default: '—', description: 'Makes rows interactive and calls handler on click' },
  { name: 'striped',       type: 'boolean',          default: 'false', description: 'Alternating row background' },
  { name: 'bordered',      type: 'boolean',          default: 'false', description: 'Vertical column separators' },
  { name: 'dense',         type: 'boolean',          default: 'false', description: 'Compact padding' },
  { name: 'emptyMessage',  type: 'React.ReactNode',  default: '"No data available."', description: 'Content shown when data is empty' },
  { name: 'sortKey',       type: 'string',           default: '—',    description: 'Currently sorted column key (controlled)' },
  { name: 'sortDirection', type: '"asc" | "desc" | "none"', default: '"none"', description: 'Current sort direction (controlled)' },
  { name: 'onSort',        type: '(key: string, direction: SortDirection) => void', default: '—', description: 'Called when a sortable column header is clicked' },
  { name: 'aria-label',    type: 'string',           default: '—',    description: 'Accessible label for the table region' },
];

const COL_PROPS = [
  { name: 'key',      type: 'string',           required: true,  description: 'Property name on the row object' },
  { name: 'header',   type: 'React.ReactNode',  required: true,  description: 'Column header content' },
  { name: 'render',   type: '(value, row, index) => React.ReactNode', default: '—', description: 'Custom cell renderer' },
  { name: 'sortable', type: 'boolean',          default: 'false', description: 'Enables sort for this column' },
  { name: 'width',    type: 'string',           default: '—',    description: 'CSS column width (e.g. "120px")' },
  { name: 'align',    type: '"left" | "center" | "right"', default: '"left"', description: 'Cell text alignment' },
];

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
};

const sampleData: User[] = [
  { id: 1, name: 'Ada Okafor', email: 'ada@switch.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bola Adeleke', email: 'bola@switch.com', role: 'Editor', status: 'inactive' },
  { id: 3, name: 'Chidi Nwankwo', email: 'chidi@switch.com', role: 'Viewer', status: 'active' },
  { id: 4, name: 'Dayo Ajayi', email: 'dayo@switch.com', role: 'Editor', status: 'active' },
  { id: 5, name: 'Emeka Obi', email: 'emeka@switch.com', role: 'Viewer', status: 'inactive' },
];

const StatusBadge = ({ status }: { status: 'active' | 'inactive' }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 500,
      backgroundColor: status === 'active' ? '#dcfce7' : '#f3f4f6',
      color: status === 'active' ? '#166534' : '#6b7280',
    }}
  >
    {status === 'active' ? 'Active' : 'Inactive'}
  </span>
);

export default function TablePage() {
  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | 'none'>('none');

  const handleSort = (key: string, direction: 'asc' | 'desc' | 'none') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const sortedData = [...sampleData].sort((a, b) => {
    if (!sortKey || sortDirection === 'none') return 0;
    const aVal = a[sortKey as keyof User];
    const bVal = b[sortKey as keyof User];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const basicColumns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
  ];

  const columnsWithStatus = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (value: unknown) => <StatusBadge status={value as 'active' | 'inactive'} />,
    },
  ];

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Table</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Flexible data table with sortable columns, custom cell renderers, striped and bordered variants, and clickable rows.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Basic Table">
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Table
              columns={basicColumns}
              data={sampleData.slice(0, 3)}
              rowKey="id"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Striped with Clickable Rows">
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Table
              columns={basicColumns}
              data={sampleData}
              rowKey="id"
              striped
              onRowClick={(row) => alert(`Clicked: ${row.name}`)}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Custom Cell Renderer & Sorting">
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Table
              columns={columnsWithStatus}
              data={sortedData}
              rowKey="id"
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <p style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
              Click "Name" or "Role" header to sort
            </p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Bordered & Dense">
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Table
              columns={basicColumns}
              data={sampleData.slice(0, 3)}
              rowKey="id"
              bordered
              dense
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Empty State">
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Table
              columns={basicColumns}
              data={[]}
              rowKey="id"
              emptyMessage="No users found. Try adjusting your filters."
            />
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Table Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>TableColumn Shape</h2>
        <PropsTable props={COL_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: 'var(--switch-color-text-secondary)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Sortable column headers expose <code>aria-sort</code> (<code>ascending</code> / <code>descending</code> / <code>none</code>).</li>
          <li>Clickable rows have <code>tabIndex=0</code> and respond to <kbd>Enter</kbd> / <kbd>Space</kbd>.</li>
          <li>The table is wrapped in a scrollable <code>role="region"</code> with an optional <code>aria-label</code>.</li>
        </ul>
      </section>
    </article>
  );
}
