import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ListItem } from './ListItem';

describe('ListItem', () => {
  it('renders label', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.getByText('Inbox')).toBeInTheDocument();
  });

  it('renders sublabel when provided', () => {
    render(<ListItem label="Inbox" sublabel="12 messages" />);
    expect(screen.getByText('12 messages')).toBeInTheDocument();
  });

  it('renders as button when onClick is provided', () => {
    render(<ListItem label="Click me" onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<ListItem label="Click" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders avatar initials for label-avatar variant', () => {
    render(
      <ListItem
        variant="label-avatar"
        label="User"
        avatar={{ initials: 'AB' }}
      />
    );
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders control for label-control variant', () => {
    render(
      <ListItem
        variant="label-control"
        label="Setting"
        control={<input type="checkbox" aria-label="toggle" />}
      />
    );
    expect(screen.getByRole('checkbox', { name: 'toggle' })).toBeInTheDocument();
  });
});
