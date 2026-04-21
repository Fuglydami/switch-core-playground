import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders title', () => {
    render(<Toast type="info" title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Toast type="success" title="Done" description="All good." />);
    expect(screen.getByText('All good.')).toBeInTheDocument();
  });

  it('renders dismiss button when onDismiss is provided', () => {
    render(<Toast type="error" title="Oops" onDismiss={vi.fn()} />);
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const onDismiss = vi.fn();
    render(<Toast type="warning" title="Warning" onDismiss={onDismiss} />);
    await userEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('does not render dismiss button when onDismiss is not provided', () => {
    render(<Toast type="info" title="No dismiss" />);
    expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument();
  });

  it('has role alert', () => {
    render(<Toast type="success" title="Success!" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
