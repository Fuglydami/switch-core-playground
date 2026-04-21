import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a horizontal separator by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Divider label="Today" />);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('still has separator role when labelled', () => {
    render(<Divider label="Section" />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders vertical separator with correct aria-orientation', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('horizontal separator has correct aria-orientation', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('applies custom className', () => {
    const { container } = render(<Divider className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
