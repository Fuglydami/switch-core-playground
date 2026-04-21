import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled and shows aria-busy when isLoading', () => {
    render(<Button isLoading>Submit</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('does not call onPress when disabled', async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress} disabled>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies variant class', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild?.className).toMatch(/secondary/);
  });

  it('applies size class', () => {
    const { container } = render(<Button size="small">Small</Button>);
    expect(container.firstChild?.className).toMatch(/small/);
  });

  it('renders leftIcon', () => {
    render(<Button leftIcon={<span data-testid="icon" />}>Label</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders rightIcon', () => {
    render(<Button rightIcon={<span data-testid="icon" />}>Label</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('shows loading spinner when isLoading', () => {
    const { container } = render(<Button isLoading>Submit</Button>);
    // Button shows spinner element when loading
    expect(container.querySelector('[class*="spinner"]')).toBeInTheDocument();
  });
});
