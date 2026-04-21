import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders label', () => {
    render(<Chip label="Portland" />);
    expect(screen.getByText('Portland')).toBeInTheDocument();
  });

  it('renders count badge when provided', () => {
    render(<Chip label="Portland" count={8} />);
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('renders dismiss button when onRemove provided', () => {
    render(<Chip label="Portland" onRemove={() => {}} />);
    expect(screen.getByRole('button', { name: /remove portland/i })).toBeInTheDocument();
  });

  it('calls onRemove when dismiss button is clicked', async () => {
    const onRemove = vi.fn();
    render(<Chip label="Portland" onRemove={onRemove} />);
    await userEvent.click(screen.getByRole('button', { name: /remove portland/i }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('calls onSelect with toggled value when clicked (selectable)', async () => {
    const onSelect = vi.fn();
    render(<Chip label="Biking" selected={false} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onSelect).toHaveBeenCalledWith(true);
  });

  it('has aria-checked=true when selected', () => {
    render(<Chip label="Biking" selected onSelect={() => {}} />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not call onSelect when disabled', async () => {
    const onSelect = vi.fn();
    render(<Chip label="Biking" selected={false} onSelect={onSelect} disabled />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('dismiss does not propagate to onSelect', async () => {
    const onSelect = vi.fn();
    const onRemove = vi.fn();
    render(<Chip label="Portland" selected onSelect={onSelect} onRemove={onRemove} />);
    await userEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledOnce();
    expect(onSelect).not.toHaveBeenCalled();
  });
});
