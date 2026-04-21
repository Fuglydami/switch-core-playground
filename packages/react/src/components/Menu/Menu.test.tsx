import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Menu } from './Menu';

const items = [
  { id: 'edit',   label: 'Edit',   onClick: vi.fn() },
  { id: 'dup',    label: 'Duplicate', onClick: vi.fn() },
  { id: 'sep',    label: 'separator' },
  { id: 'delete', label: 'Delete', danger: true, onClick: vi.fn() },
];

const trigger = <button type="button">Open</button>;

describe('Menu', () => {
  it('does not show menu items before trigger click', () => {
    render(<Menu items={items} trigger={trigger} />);
    expect(screen.queryByRole('menuitem')).toBeNull();
    expect(screen.queryByText('Edit')).toBeNull();
  });

  it('opens on trigger click', async () => {
    render(<Menu items={items} trigger={trigger} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('closes on second trigger click', async () => {
    render(<Menu items={items} trigger={trigger} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByText('Edit')).toBeNull();
  });

  it('closes on Escape key', async () => {
    render(<Menu items={items} trigger={trigger} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('Edit')).toBeNull();
  });

  it('closes on outside click', async () => {
    render(
      <div>
        <Menu items={items} trigger={trigger} />
        <button type="button">Outside</button>
      </div>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByText('Edit')).toBeNull();
  });

  it('calls onClick when item is selected', async () => {
    const onClick = vi.fn();
    const testItems = [{ id: 'a', label: 'Action', onClick }];
    render(<Menu items={testItems} trigger={trigger} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.click(screen.getByText('Action'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders nested submenu items', async () => {
    const nested = [
      {
        id: 'parent', label: 'Parent',
        children: [{ id: 'child', label: 'Child', onClick: vi.fn() }],
      },
    ];
    render(<Menu items={nested} trigger={trigger} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    const parentBtn = screen.getByText('Parent').closest('button')!;
    await userEvent.hover(parentBtn);
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('does not call onClick for disabled items', async () => {
    const onClick = vi.fn();
    const testItems = [{ id: 'a', label: 'Disabled', disabled: true, onClick }];
    render(<Menu items={testItems} trigger={trigger} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.click(screen.getByText('Disabled'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
