import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar', () => {
  it('renders with initials', () => {
    render(<Avatar initials="JD" testID="avatar" />);
    expect(screen.getByText('JD')).toBeTruthy();
  });

  it('renders uppercase initials limited to 2 chars', () => {
    render(<Avatar initials="abc" testID="avatar" />);
    expect(screen.getByText('AB')).toBeTruthy();
  });

  it('renders with image source', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" testID="avatar" />);
    expect(screen.getByTestId('avatar')).toBeTruthy();
  });

  it('renders placeholder when no src or initials', () => {
    render(<Avatar testID="avatar" />);
    expect(screen.getByTestId('avatar')).toBeTruthy();
  });

  it('shows online indicator', () => {
    render(<Avatar initials="JD" online testID="avatar" />);
    expect(screen.getByLabelText('Online')).toBeTruthy();
  });

  it('shows offline indicator', () => {
    render(<Avatar initials="JD" online={false} testID="avatar" />);
    expect(screen.getByLabelText('Offline')).toBeTruthy();
  });

  it('renders edit button when editable', () => {
    const onEdit = jest.fn();
    render(<Avatar initials="JD" editable onEdit={onEdit} testID="avatar" />);
    const editBtn = screen.getByRole('button', { name: 'Edit avatar' });
    fireEvent.press(editBtn);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Avatar initials="JD" size={40} testID="avatar" />);
    expect(screen.getByTestId('avatar')).toBeTruthy();

    rerender(<Avatar initials="JD" size={56} testID="avatar" />);
    expect(screen.getByTestId('avatar')).toBeTruthy();

    rerender(<Avatar initials="JD" size={80} testID="avatar" />);
    expect(screen.getByTestId('avatar')).toBeTruthy();
  });
});

describe('AvatarGroup', () => {
  const mockAvatars = [
    { initials: 'AA' },
    { initials: 'BB' },
    { initials: 'CC' },
    { initials: 'DD' },
    { initials: 'EE' },
  ];

  it('renders avatars up to max', () => {
    render(<AvatarGroup avatars={mockAvatars} max={3} testID="group" />);
    expect(screen.getByText('AA')).toBeTruthy();
    expect(screen.getByText('BB')).toBeTruthy();
    expect(screen.getByText('CC')).toBeTruthy();
    expect(screen.queryByText('DD')).toBeNull();
  });

  it('shows overflow count', () => {
    render(<AvatarGroup avatars={mockAvatars} max={3} testID="group" />);
    expect(screen.getByText('+2')).toBeTruthy();
  });

  it('does not show overflow when all fit', () => {
    render(<AvatarGroup avatars={mockAvatars.slice(0, 2)} max={4} testID="group" />);
    expect(screen.queryByText(/\+/)).toBeNull();
  });

  it('renders with default max of 4', () => {
    render(<AvatarGroup avatars={mockAvatars} testID="group" />);
    expect(screen.getByText('+1')).toBeTruthy();
  });
});
