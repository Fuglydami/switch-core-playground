import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Accordion } from './Accordion';

const items = [
  { id: 'a', label: 'Panel A', content: 'Content A' },
  { id: 'b', label: 'Panel B', content: 'Content B' },
  { id: 'c', label: 'Panel C', content: 'Content C', disabled: true },
];

describe('Accordion', () => {
  it('renders all panel labels', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.getByText('Panel B')).toBeInTheDocument();
    expect(screen.getByText('Panel C')).toBeInTheDocument();
  });

  it('hides panel content by default', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Content A').closest('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('shows content of defaultOpen panel', () => {
    render(<Accordion items={items} defaultOpen={['a']} />);
    expect(screen.getByText('Content A').closest('[aria-hidden="true"]')).toBeNull();
  });

  it('expands a panel on click', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: /Panel A/i }));
    expect(screen.getByText('Content A').closest('[aria-hidden="true"]')).toBeNull();
  });

  it('collapses an open panel on second click', async () => {
    render(<Accordion items={items} defaultOpen={['a']} />);
    await userEvent.click(screen.getByRole('button', { name: /Panel A/i }));
    expect(screen.getByText('Content A').closest('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('collapses previous panel in single mode', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: /Panel A/i }));
    await userEvent.click(screen.getByRole('button', { name: /Panel B/i }));
    expect(screen.getByText('Content A').closest('[aria-hidden="true"]')).toBeInTheDocument();
    expect(screen.getByText('Content B').closest('[aria-hidden="true"]')).toBeNull();
  });

  it('keeps multiple panels open when multiple=true', async () => {
    render(<Accordion items={items} multiple />);
    await userEvent.click(screen.getByRole('button', { name: /Panel A/i }));
    await userEvent.click(screen.getByRole('button', { name: /Panel B/i }));
    expect(screen.getByText('Content A').closest('[aria-hidden="true"]')).toBeNull();
    expect(screen.getByText('Content B').closest('[aria-hidden="true"]')).toBeNull();
  });

  it('does not toggle a disabled panel', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: /Panel C/i }));
    expect(screen.getByText('Content C').closest('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('calls onToggle with updated IDs', async () => {
    const onToggle = vi.fn();
    render(<Accordion items={items} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button', { name: /Panel A/i }));
    expect(onToggle).toHaveBeenCalledWith(['a']);
  });

  it('sets aria-expanded correctly', async () => {
    render(<Accordion items={items} />);
    const btn = screen.getByRole('button', { name: /Panel A/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('trigger is disabled attribute when item.disabled', () => {
    render(<Accordion items={items} />);
    expect(screen.getByRole('button', { name: /Panel C/i })).toBeDisabled();
  });
});
