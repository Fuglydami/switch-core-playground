import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Table' };

const WEB_CODE = `import { Table } from '@switch/react';

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

export default function TablePage() {
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
