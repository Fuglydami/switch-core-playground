import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Checkbox, Radio, Toggle } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" testID="checkbox" />);
    expect(screen.getByText('Accept terms')).toBeTruthy();
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} testID="checkbox" />);
    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} disabled testID="checkbox" />);
    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has correct accessibility role', () => {
    render(<Checkbox testID="checkbox" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });

  it('toggles checked state in onChange', () => {
    const onChange = jest.fn();
    render(<Checkbox checked onChange={onChange} testID="checkbox" />);
    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).toHaveBeenCalledWith(false);
  });
});

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio label="Option A" testID="radio" />);
    expect(screen.getByText('Option A')).toBeTruthy();
  });

  it('calls onChange when pressed and not already checked', () => {
    const onChange = jest.fn();
    render(<Radio onChange={onChange} testID="radio" />);
    fireEvent.press(screen.getByTestId('radio'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when already checked', () => {
    const onChange = jest.fn();
    render(<Radio checked onChange={onChange} testID="radio" />);
    fireEvent.press(screen.getByTestId('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Radio onChange={onChange} disabled testID="radio" />);
    fireEvent.press(screen.getByTestId('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has correct accessibility role', () => {
    render(<Radio testID="radio" />);
    expect(screen.getByRole('radio')).toBeTruthy();
  });
});

describe('Toggle', () => {
  it('renders with label', () => {
    render(<Toggle label="Dark mode" testID="toggle" />);
    expect(screen.getByText('Dark mode')).toBeTruthy();
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    render(<Toggle onChange={onChange} testID="toggle" />);
    fireEvent.press(screen.getByTestId('toggle'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggles from checked to unchecked', () => {
    const onChange = jest.fn();
    render(<Toggle checked onChange={onChange} testID="toggle" />);
    fireEvent.press(screen.getByTestId('toggle'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Toggle onChange={onChange} disabled testID="toggle" />);
    fireEvent.press(screen.getByTestId('toggle'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has correct accessibility role', () => {
    render(<Toggle testID="toggle" />);
    expect(screen.getByRole('switch')).toBeTruthy();
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Toggle size="small" testID="toggle" />);
    expect(screen.getByTestId('toggle')).toBeTruthy();

    rerender(<Toggle size="medium" testID="toggle" />);
    expect(screen.getByTestId('toggle')).toBeTruthy();

    rerender(<Toggle size="large" testID="toggle" />);
    expect(screen.getByTestId('toggle')).toBeTruthy();
  });
});
