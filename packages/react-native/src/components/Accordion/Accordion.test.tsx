import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Accordion } from './Accordion';

const items = [
  { id: '1', label: 'Section 1', content: <Text>Content 1</Text> },
  { id: '2', label: 'Section 2', content: <Text>Content 2</Text> },
  { id: '3', label: 'Section 3', content: <Text>Content 3</Text>, disabled: true },
];

describe('Accordion (RN)', () => {
  it('renders all items', () => {
    const { getByText } = render(<Accordion items={items} />);
    expect(getByText('Section 1')).toBeTruthy();
    expect(getByText('Section 2')).toBeTruthy();
    expect(getByText('Section 3')).toBeTruthy();
  });

  it('expands panel on press', () => {
    const { getByText, queryByText, getByLabelText } = render(
      <Accordion items={items} />
    );
    expect(queryByText('Content 1')).toBeNull();

    fireEvent.press(getByLabelText('Section 1'));
    expect(getByText('Content 1')).toBeTruthy();
  });

  it('collapses panel on second press', () => {
    const { getByLabelText, queryByText } = render(
      <Accordion items={items} defaultOpen={['1']} />
    );
    fireEvent.press(getByLabelText('Section 1'));
    expect(queryByText('Content 1')).toBeNull();
  });

  it('allows only one panel open by default', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <Accordion items={items} defaultOpen={['1']} />
    );
    expect(getByText('Content 1')).toBeTruthy();

    fireEvent.press(getByLabelText('Section 2'));
    expect(queryByText('Content 1')).toBeNull();
    expect(getByText('Content 2')).toBeTruthy();
  });

  it('allows multiple panels open when multiple=true', () => {
    const { getByLabelText, getByText } = render(
      <Accordion items={items} multiple defaultOpen={['1']} />
    );
    fireEvent.press(getByLabelText('Section 2'));
    expect(getByText('Content 1')).toBeTruthy();
    expect(getByText('Content 2')).toBeTruthy();
  });

  it('calls onToggle with open IDs', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(
      <Accordion items={items} onToggle={onToggle} />
    );
    fireEvent.press(getByLabelText('Section 1'));
    expect(onToggle).toHaveBeenCalledWith(['1']);
  });

  it('does not expand disabled panel', () => {
    const { getByLabelText, queryByText } = render(<Accordion items={items} />);
    fireEvent.press(getByLabelText('Section 3'));
    expect(queryByText('Content 3')).toBeNull();
  });

  it('supports controlled open state', () => {
    const { getByText, queryByText, rerender } = render(
      <Accordion items={items} openIds={['1']} />
    );
    expect(getByText('Content 1')).toBeTruthy();

    rerender(<Accordion items={items} openIds={['2']} />);
    expect(queryByText('Content 1')).toBeNull();
    expect(getByText('Content 2')).toBeTruthy();
  });

  it('renders bordered variant by default', () => {
    const { getByText } = render(<Accordion items={items} />);
    expect(getByText('Section 1')).toBeTruthy();
  });

  it('renders borderless variant', () => {
    const { getByText } = render(
      <Accordion items={items} variant="borderless" />
    );
    expect(getByText('Section 1')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    const Icon = () => <Text>Icon</Text>;
    const itemsWithIcon = [
      { id: '1', label: 'With Icon', content: <Text>Content</Text>, icon: <Icon /> },
    ];
    const { getByText } = render(<Accordion items={itemsWithIcon} />);
    expect(getByText('Icon')).toBeTruthy();
  });
});
