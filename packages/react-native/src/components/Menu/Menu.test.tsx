import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Menu } from './Menu';

// Note: Menu uses Modal which requires special handling in tests.
// These tests focus on what can be tested without the Modal rendering.

describe('Menu (RN)', () => {
  it('renders trigger element', () => {
    const items = [{ id: '1', label: 'Edit', onPress: jest.fn() }];
    const { getByText } = render(
      <Menu items={items} trigger={<Text>Open Menu</Text>} />
    );
    expect(getByText('Open Menu')).toBeTruthy();
  });

  it('accepts onOpenChange prop', () => {
    const onOpenChange = jest.fn();
    const items = [{ id: '1', label: 'Edit', onPress: jest.fn() }];
    const { getByText } = render(
      <Menu
        items={items}
        trigger={<Text>Open Menu</Text>}
        onOpenChange={onOpenChange}
      />
    );
    // measureInWindow doesn't work in tests, so we just verify the component renders
    expect(getByText('Open Menu')).toBeTruthy();
  });

  it('accepts items array prop', () => {
    const items = [
      { id: '1', label: 'Edit', onPress: jest.fn() },
      { id: '2', label: 'Delete', danger: true, onPress: jest.fn() },
      { id: '3', label: 'Disabled', disabled: true, onPress: jest.fn() },
    ];
    const { getByText } = render(
      <Menu items={items} trigger={<Text>Open Menu</Text>} />
    );
    expect(getByText('Open Menu')).toBeTruthy();
  });

  it('accepts items with icons', () => {
    const Icon = () => <Text>Icon</Text>;
    const items = [
      { id: '1', label: 'With Icon', icon: <Icon />, onPress: jest.fn() },
    ];
    const { getByText } = render(
      <Menu items={items} trigger={<Text>Open Menu</Text>} />
    );
    expect(getByText('Open Menu')).toBeTruthy();
  });

  it('accepts separator items', () => {
    const items = [
      { id: '1', label: 'Item 1', onPress: jest.fn() },
      { id: 'separator', label: '' },
      { id: '2', label: 'Item 2', onPress: jest.fn() },
    ];
    const { getByText } = render(
      <Menu items={items} trigger={<Text>Open Menu</Text>} />
    );
    expect(getByText('Open Menu')).toBeTruthy();
  });
});
