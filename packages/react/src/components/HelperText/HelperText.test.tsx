import React from 'react';
import { render, screen } from '@testing-library/react';
import { HelperText } from './HelperText';

describe('HelperText', () => {
  it('renders text content', () => {
    render(<HelperText text="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('renders with info variant by default', () => {
    const { container } = render(<HelperText text="Info message" />);
    // CSS modules hash class names, check for partial match
    expect(container.firstChild?.className).toMatch(/info/);
  });

  it('renders with warning variant', () => {
    const { container } = render(<HelperText text="Warning message" variant="warning" />);
    expect(container.firstChild?.className).toMatch(/warning/);
  });

  it('renders with error variant', () => {
    const { container } = render(<HelperText text="Error message" variant="error" />);
    expect(container.firstChild?.className).toMatch(/error/);
  });

  it('renders default icon for info', () => {
    render(<HelperText text="Info" variant="info" />);
    expect(screen.getByText('ℹ')).toBeInTheDocument();
  });

  it('renders default icon for warning', () => {
    render(<HelperText text="Warning" variant="warning" />);
    expect(screen.getByText('⚠')).toBeInTheDocument();
  });

  it('renders default icon for error', () => {
    render(<HelperText text="Error" variant="error" />);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<HelperText text="Custom" icon={<span data-testid="custom-icon">🔔</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('has accessible live region', () => {
    render(<HelperText text="Accessible" />);
    const container = screen.getByRole('status');
    expect(container).toHaveAttribute('aria-live', 'polite');
  });

  it('applies custom className', () => {
    const { container } = render(<HelperText text="Custom class" className="my-class" />);
    expect(container.firstChild).toHaveClass('my-class');
  });
});
