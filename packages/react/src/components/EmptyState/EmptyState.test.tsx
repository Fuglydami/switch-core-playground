import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<EmptyState title="Empty" description="Nothing to see here." />);
    expect(screen.getByText('Nothing to see here.')).toBeInTheDocument();
  });

  it('renders default illustration when none provided', () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders custom illustration', () => {
    render(<EmptyState title="Empty" illustration={<img src="/test.svg" alt="empty" />} />);
    // The illustration wrapper has aria-hidden, so query by alt text directly
    expect(screen.getByAltText('empty')).toBeInTheDocument();
  });

  it('renders action slot', async () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="Empty"
        action={<button type="button" onClick={onClick}>Add item</button>}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders secondary action slot', () => {
    render(
      <EmptyState
        title="Empty"
        action={<button type="button">Primary</button>}
        secondaryAction={<a href="/help">Learn more</a>}
      />
    );
    expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument();
  });

  it('renders no actions section when no action provided', () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect(container.querySelector('.actions')).toBeNull();
  });
});
