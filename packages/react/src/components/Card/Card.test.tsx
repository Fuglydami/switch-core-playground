import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Card, StatCard } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as div by default', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild!.nodeName).toBe('DIV');
  });

  it('renders as button when onClick provided', () => {
    render(<Card onClick={() => {}}>Content</Card>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Card onClick={onClick}>Content</Card>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies shadow class', () => {
    const { container } = render(<Card shadow="medium">Content</Card>);
    expect(container.firstChild?.className).toMatch(/shadow.*medium|medium.*shadow/);
  });

  it('applies padding class', () => {
    const { container } = render(<Card padding="large">Content</Card>);
    expect(container.firstChild?.className).toMatch(/pad.*large|large.*pad/);
  });
});

describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Total Users" value="1,234" />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders trend badge', () => {
    render(<StatCard title="Revenue" value="₦5M" trend={{ value: '12%', direction: 'up' }} />);
    expect(screen.getByText('12%')).toBeInTheDocument();
  });

  it('renders action link', () => {
    render(<StatCard title="Users" value="100" action="View Details" />);
    expect(screen.getByRole('button', { name: 'View Details' })).toBeInTheDocument();
  });

  it('calls onAction when action link clicked', async () => {
    const onAction = vi.fn();
    render(<StatCard title="Users" value="100" action="View Details" onAction={onAction} />);
    await userEvent.click(screen.getByRole('button', { name: 'View Details' }));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('applies correct trend class for up direction', () => {
    const { container } = render(
      <StatCard title="X" value="1" trend={{ value: '5%', direction: 'up' }} />
    );
    expect(container.querySelector('[class*="trendUp"]')).toBeInTheDocument();
  });

  it('applies correct trend class for down direction', () => {
    const { container } = render(
      <StatCard title="X" value="1" trend={{ value: '5%', direction: 'down' }} />
    );
    expect(container.querySelector('[class*="trendDown"]')).toBeInTheDocument();
  });
});
