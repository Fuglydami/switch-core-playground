import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Chip } from './Chip';

describe('Chip (RN)', () => {
  it('renders label', () => {
    const { getByText } = render(<Chip label="Technology" />);
    expect(getByText('Technology')).toBeTruthy();
  });

  it('renders count when provided', () => {
    const { getByText } = render(<Chip label="Items" count={42} />);
    expect(getByText('42')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    const Icon = () => null;
    const { UNSAFE_getByType } = render(
      <Chip label="Tagged" icon={<Icon />} />
    );
    expect(UNSAFE_getByType(Icon)).toBeTruthy();
  });

  it('calls onSelect when selectable chip is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <Chip label="Select me" onSelect={onSelect} />
    );
    fireEvent.press(getByText('Select me'));
    expect(onSelect).toHaveBeenCalledWith(true);
  });

  it('toggles selection state', () => {
    const onSelect = jest.fn();
    const { getByText, rerender } = render(
      <Chip label="Toggle" selected={false} onSelect={onSelect} />
    );
    fireEvent.press(getByText('Toggle'));
    expect(onSelect).toHaveBeenCalledWith(true);

    rerender(<Chip label="Toggle" selected={true} onSelect={onSelect} />);
    fireEvent.press(getByText('Toggle'));
    expect(onSelect).toHaveBeenCalledWith(false);
  });

  it('calls onRemove when remove button pressed', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = render(
      <Chip label="Removable" onRemove={onRemove} />
    );
    fireEvent.press(getByLabelText('Remove Removable'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('does not call onSelect when disabled', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <Chip label="Disabled" onSelect={onSelect} disabled />
    );
    fireEvent.press(getByText('Disabled'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('has checkbox role when selectable', () => {
    const { getByRole } = render(
      <Chip label="Selectable" onSelect={() => {}} />
    );
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('renders in different sizes', () => {
    const { rerender, getByText } = render(
      <Chip label="Small" size="small" />
    );
    expect(getByText('Small')).toBeTruthy();

    rerender(<Chip label="Medium" size="medium" />);
    expect(getByText('Medium')).toBeTruthy();
  });
});
