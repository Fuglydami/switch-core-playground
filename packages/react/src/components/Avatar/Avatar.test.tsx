import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar', () => {
  it('renders initials', () => {
    render(<Avatar initials="OA" />);
    expect(screen.getByText('OA')).toBeInTheDocument();
  });

  it('renders image when src provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="Profile" />);
    expect(screen.getByRole('img', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders placeholder when no src or initials', () => {
    const { container } = render(<Avatar />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows online indicator when status="online"', () => {
    render(<Avatar initials="OA" status="online" />);
    expect(screen.getByLabelText('Online')).toBeInTheDocument();
  });

  it('shows offline indicator when status="offline"', () => {
    render(<Avatar initials="OA" status="offline" />);
    expect(screen.getByLabelText('Offline')).toBeInTheDocument();
  });

  it('renders edit overlay button when editable', () => {
    render(<Avatar initials="OA" editable />);
    expect(screen.getByRole('button', { name: /edit avatar/i })).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', async () => {
    const onEdit = vi.fn();
    render(<Avatar initials="OA" editable onEdit={onEdit} />);
    await userEvent.click(screen.getByRole('button', { name: /edit avatar/i }));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it('truncates initials to 2 chars', () => {
    render(<Avatar initials="ABCD" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });
});

describe('AvatarGroup', () => {
  const avatars = [
    { initials: 'AA' }, { initials: 'OA' }, { initials: 'BD' },
    { initials: 'CE' }, { initials: 'DF' }, { initials: 'EG' },
  ];

  it('renders up to max avatars', () => {
    render(<AvatarGroup avatars={avatars} max={4} />);
    expect(screen.getByText('AA')).toBeInTheDocument();
    expect(screen.getByText('CE')).toBeInTheDocument();
  });

  it('shows overflow count', () => {
    render(<AvatarGroup avatars={avatars} max={4} />);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('shows no overflow when count fits within max', () => {
    render(<AvatarGroup avatars={avatars.slice(0, 3)} max={4} />);
    expect(screen.queryByText(/^\+/)).toBeNull();
  });
});
