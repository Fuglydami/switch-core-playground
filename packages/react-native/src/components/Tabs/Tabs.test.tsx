import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Tabs } from './Tabs';

const ITEMS = [
  { id: 'a', label: 'Tab A' },
  { id: 'b', label: 'Tab B' },
  { id: 'c', label: 'Tab C', disabled: true },
];

describe('Tabs (RN)', () => {
  it('renders all tab labels', () => {
    const { getByText } = render(
      <Tabs items={ITEMS} activeId="a" onChange={jest.fn()} />
    );
    expect(getByText('Tab A')).toBeTruthy();
    expect(getByText('Tab B')).toBeTruthy();
  });

  it('calls onChange when tab pressed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Tabs items={ITEMS} activeId="a" onChange={onChange} />
    );
    fireEvent.press(getByText('Tab B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not call onChange for disabled tab', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Tabs items={ITEMS} activeId="a" onChange={onChange} />
    );
    fireEvent.press(getByText('Tab C'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders pill variant', () => {
    const { getByText } = render(
      <Tabs items={ITEMS} activeId="a" onChange={jest.fn()} variant="pill" />
    );
    expect(getByText('Tab A')).toBeTruthy();
  });
});
