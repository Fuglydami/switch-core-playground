import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Table } from './Table';

const columns = [
  { key: 'name',  header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role',  header: 'Role', sortable: true },
];

const data = [
  { id: 1, name: 'Ada',  email: 'ada@test.com',  role: 'Admin' },
  { id: 2, name: 'Bola', email: 'bola@test.com', role: 'Editor' },
];

describe('Table', () => {
  it('renders column headers', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('bola@test.com')).toBeInTheDocument();
  });

  it('shows empty message when data is empty', () => {
    render(<Table columns={columns} data={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', async () => {
    const onRowClick = vi.fn();
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />);
    await userEvent.click(screen.getByText('Ada'));
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it('calls onSort when a sortable header is clicked', async () => {
    const onSort = vi.fn();
    render(<Table columns={columns} data={data} onSort={onSort} />);
    await userEvent.click(screen.getByText('Role'));
    expect(onSort).toHaveBeenCalledWith('role', 'asc');
  });

  it('cycles sort direction: none→asc→desc→none', async () => {
    const onSort = vi.fn();
    render(<Table columns={columns} data={data} onSort={onSort} sortKey="role" sortDirection="asc" />);
    await userEvent.click(screen.getByText('Role'));
    expect(onSort).toHaveBeenCalledWith('role', 'desc');
  });

  it('uses custom render function for cells', () => {
    const cols = [
      { key: 'name', header: 'Name', render: (v: unknown) => <span data-testid="custom">{String(v)}</span> },
    ];
    render(<Table columns={cols} data={data} />);
    expect(screen.getAllByTestId('custom')).toHaveLength(2);
  });

  it('applies aria-sort to sorted column', () => {
    render(<Table columns={columns} data={data} sortKey="role" sortDirection="asc" />);
    const roleHeader = screen.getByRole('columnheader', { name: /role/i });
    expect(roleHeader).toHaveAttribute('aria-sort', 'ascending');
  });
});
