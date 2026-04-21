import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card, StatCard } from './Card';

describe('Card (RN)', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Card>
        <Text>Card content</Text>
      </Card>
    );
    expect(getByText('Card content')).toBeTruthy();
  });

  it('is pressable when onPress provided', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Card onPress={onPress}>
        <Text>Pressable card</Text>
      </Card>
    );
    fireEvent.press(getByText('Pressable card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('has button role when pressable', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Card onPress={onPress}>
        <Text>Pressable</Text>
      </Card>
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders with different padding sizes', () => {
    const { rerender, getByText } = render(
      <Card padding="small">
        <Text>Small padding</Text>
      </Card>
    );
    expect(getByText('Small padding')).toBeTruthy();

    rerender(
      <Card padding="large">
        <Text>Large padding</Text>
      </Card>
    );
    expect(getByText('Large padding')).toBeTruthy();
  });

  it('renders with different shadow levels', () => {
    const { rerender, getByText } = render(
      <Card shadow="none">
        <Text>No shadow</Text>
      </Card>
    );
    expect(getByText('No shadow')).toBeTruthy();

    rerender(
      <Card shadow="medium">
        <Text>Medium shadow</Text>
      </Card>
    );
    expect(getByText('Medium shadow')).toBeTruthy();
  });
});

describe('StatCard (RN)', () => {
  it('renders title and value', () => {
    const { getByText } = render(
      <StatCard title="Revenue" value="₦1,234,567" />
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('₦1,234,567')).toBeTruthy();
  });

  it('renders trend when provided', () => {
    const { getByText } = render(
      <StatCard
        title="Users"
        value="1,234"
        trend={{ direction: 'up', value: '+12%' }}
      />
    );
    expect(getByText('+12%')).toBeTruthy();
  });

  it('renders action button when provided', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <StatCard
        title="Orders"
        value="567"
        action="View all"
        onAction={onAction}
      />
    );
    const actionButton = getByText('View all');
    expect(actionButton).toBeTruthy();
    fireEvent.press(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders icon when provided', () => {
    const Icon = () => null;
    const { UNSAFE_getByType } = render(
      <StatCard title="Sales" value="100" icon={<Icon />} />
    );
    expect(UNSAFE_getByType(Icon)).toBeTruthy();
  });
});
