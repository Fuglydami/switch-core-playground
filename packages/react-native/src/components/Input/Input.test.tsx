import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from './Input';

describe('Input (RN)', () => {
  it('renders text input', () => {
    const { getByTestId } = render(<Input testID="input" />);
    expect(getByTestId('input')).toBeTruthy();
  });

  it('renders label', () => {
    const { getByText } = render(<Input label="Email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders helper text', () => {
    const { getByText } = render(<Input helperText="Enter your email" />);
    expect(getByText('Enter your email')).toBeTruthy();
  });

  it('renders error message', () => {
    const { getByText } = render(<Input errorMessage="Invalid email" />);
    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('calls onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(<Input testID="input" onChangeText={onChangeText} />);
    fireEvent.changeText(getByTestId('input'), 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('is not editable when disabled', () => {
    const { getByTestId } = render(<Input testID="input" disabled />);
    expect(getByTestId('input').props.editable).toBe(false);
  });
});
