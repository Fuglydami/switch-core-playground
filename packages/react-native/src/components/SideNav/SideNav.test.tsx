import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SideNav } from './SideNav';

const items = [
  { id: 'home', label: 'Home' },
  { id: 'settings', label: 'Settings', badge: 3 },
  { id: 'disabled', label: 'Disabled', disabled: true },
];

describe('SideNav (RN)', () => {
  it('renders all nav items', () => {
    const { getByText } = render(<SideNav items={items} />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Disabled')).toBeTruthy();
  });

  it('calls onNavigate when item is pressed', () => {
    const onNavigate = jest.fn();
    const { getByLabelText } = render(
      <SideNav items={items} onNavigate={onNavigate} />
    );
    fireEvent.press(getByLabelText('Home'));
    expect(onNavigate).toHaveBeenCalledWith('home');
  });

  it('highlights active item', () => {
    const { getByLabelText } = render(
      <SideNav items={items} activeId="home" />
    );
    const homeItem = getByLabelText('Home');
    expect(homeItem.props.accessibilityState.selected).toBe(true);
  });

  it('does not call onNavigate for disabled items', () => {
    const onNavigate = jest.fn();
    const { getByLabelText } = render(
      <SideNav items={items} onNavigate={onNavigate} />
    );
    fireEvent.press(getByLabelText('Disabled'));
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('renders badge when provided', () => {
    const { getByText } = render(<SideNav items={items} />);
    expect(getByText('3')).toBeTruthy();
  });

  it('renders logo slot when provided', () => {
    const { getByText } = render(
      <SideNav items={items} logo={<Text>Logo</Text>} />
    );
    expect(getByText('Logo')).toBeTruthy();
  });

  it('renders footer slot when provided', () => {
    const { getByText } = render(
      <SideNav items={items} footer={<Text>Footer</Text>} />
    );
    expect(getByText('Footer')).toBeTruthy();
  });

  it('renders compact variant without labels', () => {
    const itemsWithIcon = [
      { id: 'home', label: 'Home', icon: <Text>HomeIcon</Text> },
    ];
    const { getByText, queryByText } = render(
      <SideNav items={itemsWithIcon} variant="compact" />
    );
    expect(getByText('HomeIcon')).toBeTruthy();
    expect(queryByText('Home')).toBeNull();
  });

  it('renders full variant with labels', () => {
    const { getByText } = render(<SideNav items={items} variant="full" />);
    expect(getByText('Home')).toBeTruthy();
  });

  it('expands nested items on press', () => {
    const nestedItems = [
      {
        id: 'parent',
        label: 'Parent',
        children: [{ id: 'child', label: 'Child' }],
      },
    ];
    const { getByLabelText, getByText, queryByText } = render(
      <SideNav items={nestedItems} />
    );
    expect(queryByText('Child')).toBeNull();

    fireEvent.press(getByLabelText('Parent'));
    expect(getByText('Child')).toBeTruthy();
  });

  it('calls onNavigate for nested items', () => {
    const onNavigate = jest.fn();
    const nestedItems = [
      {
        id: 'parent',
        label: 'Parent',
        children: [{ id: 'child', label: 'Child' }],
      },
    ];
    const { getByLabelText } = render(
      <SideNav items={nestedItems} onNavigate={onNavigate} />
    );
    fireEvent.press(getByLabelText('Parent'));
    fireEvent.press(getByLabelText('Child'));
    expect(onNavigate).toHaveBeenCalledWith('child');
  });

  it('renders in dark theme', () => {
    const { getByText } = render(<SideNav items={items} theme="dark" />);
    expect(getByText('Home')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    const Icon = () => <Text>Icon</Text>;
    const itemsWithIcon = [{ id: 'home', label: 'Home', icon: <Icon /> }];
    const { getByText } = render(<SideNav items={itemsWithIcon} />);
    expect(getByText('Icon')).toBeTruthy();
  });
});
