import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListItem } from './ListItem';

describe('ListItem (RN)', () => {
  it('renders label', () => {
    const { getByText } = render(<ListItem label="Inbox" />);
    expect(getByText('Inbox')).toBeTruthy();
  });

  it('renders sublabel', () => {
    const { getByText } = render(<ListItem label="Inbox" sublabel="12 messages" />);
    expect(getByText('12 messages')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<ListItem label="Click" onPress={onPress} />);
    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders avatar initials', () => {
    const { getByText } = render(
      <ListItem variant="label-avatar" label="User" avatar={{ initials: 'AB' }} />
    );
    expect(getByText('AB')).toBeTruthy();
  });
});
