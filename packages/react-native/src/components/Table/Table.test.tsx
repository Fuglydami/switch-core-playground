import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Table } from './Table';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User' },
];

describe('Table (RN)', () => {
  it('renders column headers', () => {
    const { getByText } = render(<Table columns={columns} data={data} />);
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Role')).toBeTruthy();
  });

  it('renders data rows', () => {
    const { getByText, getAllByText } = render(<Table columns={columns} data={data} />);
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('jane@example.com')).toBeTruthy();
    // Multiple rows have 'User' role
    expect(getAllByText('User').length).toBeGreaterThanOrEqual(1);
  });

  it('renders empty message when no data', () => {
    const { getByText } = render(<Table columns={columns} data={[]} />);
    expect(getByText('No data available.')).toBeTruthy();
  });

  it('renders custom empty message', () => {
    const { getByText } = render(
      <Table columns={columns} data={[]} emptyMessage="Nothing to show" />
    );
    expect(getByText('Nothing to show')).toBeTruthy();
  });

  it('calls onRowPress when row is pressed', () => {
    const onRowPress = jest.fn();
    const { getByText } = render(
      <Table columns={columns} data={data} onRowPress={onRowPress} />
    );
    fireEvent.press(getByText('John Doe'));
    expect(onRowPress).toHaveBeenCalledWith(data[0], 0);
  });

  it('renders with custom cell renderer', () => {
    const columnsWithRender = [
      { key: 'name', header: 'Name' },
      {
        key: 'role',
        header: 'Role',
        render: (value: unknown) => <Text testID="custom-cell">{`Role: ${value}`}</Text>,
      },
    ];
    const { getAllByTestId } = render(
      <Table columns={columnsWithRender} data={data} />
    );
    // Each row renders the custom cell
    expect(getAllByTestId('custom-cell').length).toBe(data.length);
  });

  it('renders sortable column headers', () => {
    const sortableColumns = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email' },
    ];
    const onSort = jest.fn();
    const { getByLabelText } = render(
      <Table columns={sortableColumns} data={data} onSort={onSort} />
    );
    fireEvent.press(getByLabelText('Sort by Name'));
    expect(onSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('cycles through sort directions', () => {
    const sortableColumns = [{ key: 'name', header: 'Name', sortable: true }];
    const onSort = jest.fn();
    // Start with no sortKey set - first click should set to 'asc'
    const { getByLabelText, rerender } = render(
      <Table
        columns={sortableColumns}
        data={data}
        onSort={onSort}
      />
    );
    fireEvent.press(getByLabelText('Sort by Name'));
    expect(onSort).toHaveBeenCalledWith('name', 'asc');

    // Now sortKey is 'name' and direction is 'asc' - next click should be 'desc'
    rerender(
      <Table
        columns={sortableColumns}
        data={data}
        sortKey="name"
        sortDirection="asc"
        onSort={onSort}
      />
    );
    fireEvent.press(getByLabelText('Sort by Name'));
    expect(onSort).toHaveBeenCalledWith('name', 'desc');

    // Now direction is 'desc' - next click should be 'none'
    rerender(
      <Table
        columns={sortableColumns}
        data={data}
        sortKey="name"
        sortDirection="desc"
        onSort={onSort}
      />
    );
    fireEvent.press(getByLabelText('Sort by Name'));
    expect(onSort).toHaveBeenCalledWith('name', 'none');
  });

  it('renders with striped rows', () => {
    const { toJSON } = render(<Table columns={columns} data={data} striped />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with bordered style', () => {
    const { toJSON } = render(<Table columns={columns} data={data} bordered />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with dense padding', () => {
    const { toJSON } = render(<Table columns={columns} data={data} dense />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with horizontal scroll', () => {
    const { toJSON } = render(<Table columns={columns} data={data} horizontal />);
    expect(toJSON()).toBeTruthy();
  });

  it('uses rowKey function for unique keys', () => {
    const { getByText } = render(
      <Table columns={columns} data={data} rowKey={(row) => row.id} />
    );
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('uses rowKey property for unique keys', () => {
    const { getByText } = render(
      <Table columns={columns} data={data} rowKey="id" />
    );
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('renders column with custom width', () => {
    const columnsWithWidth = [
      { key: 'name', header: 'Name', width: 200 },
      { key: 'email', header: 'Email' },
    ];
    const { getByText } = render(
      <Table columns={columnsWithWidth} data={data} />
    );
    expect(getByText('Name')).toBeTruthy();
  });

  it('renders column with alignment', () => {
    const columnsWithAlign = [
      { key: 'name', header: 'Name', align: 'left' as const },
      { key: 'amount', header: 'Amount', align: 'right' as const },
    ];
    const dataWithAmount = [{ name: 'Item', amount: 100 }];
    const { getByText } = render(
      <Table columns={columnsWithAlign} data={dataWithAmount} />
    );
    expect(getByText('Amount')).toBeTruthy();
  });
});
