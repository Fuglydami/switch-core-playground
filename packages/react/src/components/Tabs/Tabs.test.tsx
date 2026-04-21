import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs } from './Tabs';

const ITEMS = [
  { id: 'a', label: 'Tab A' },
  { id: 'b', label: 'Tab B' },
  { id: 'c', label: 'Tab C', disabled: true },
];

describe('Tabs', () => {
  it('renders all tab labels', () => {
    render(<Tabs items={ITEMS} activeId="a" onChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab B' })).toBeInTheDocument();
  });

  it('marks active tab as selected', () => {
    render(<Tabs items={ITEMS} activeId="b" onChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange when a tab is clicked', async () => {
    const onChange = vi.fn();
    render(<Tabs items={ITEMS} activeId="a" onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not call onChange for disabled tab', async () => {
    const onChange = vi.fn();
    render(<Tabs items={ITEMS} activeId="a" onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Tab C' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
