import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Check this out</Alert>);
    expect(screen.getByText('Check this out')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Alert title="Payment failed">Try again.</Alert>);
    expect(screen.getByText('Payment failed')).toBeInTheDocument();
  });

  it('has role=alert', () => {
    render(<Alert>Notice</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders dismiss button when dismissible', () => {
    render(<Alert dismissible onDismiss={() => {}}>Notice</Alert>);
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button clicked', async () => {
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Notice</Alert>);
    await userEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('does not render dismiss button when not dismissible', () => {
    render(<Alert>Notice</Alert>);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('applies variant class', () => {
    const { container } = render(<Alert variant="danger">Error</Alert>);
    expect(container.firstChild?.className).toMatch(/danger/);
  });

  it('renders custom icon', () => {
    render(<Alert icon={<span data-testid="custom-icon" />}>Notice</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
