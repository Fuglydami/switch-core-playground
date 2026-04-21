import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatePicker } from './DatePicker';

const noop = () => {};

describe('DatePicker (React Native)', () => {
  it('renders placeholder when no value', () => {
    const { getByText } = render(<DatePicker onChange={noop} placeholder="Pick a date" />);
    expect(getByText('Pick a date')).toBeTruthy();
  });

  it('renders formatted date when value provided', () => {
    const { getByText } = render(
      <DatePicker value={new Date(2024, 0, 20)} onChange={noop} />
    );
    expect(getByText(/20 Jan 2024/)).toBeTruthy();
  });

  it('renders label', () => {
    const { getByText } = render(<DatePicker label="Date of birth" onChange={noop} />);
    expect(getByText('Date of birth')).toBeTruthy();
  });

  it('renders error message', () => {
    const { getByRole } = render(
      <DatePicker onChange={noop} isError errorMessage="Invalid date" />
    );
    expect(getByRole('alert')).toBeTruthy();
  });

  it('does not call onChange when disabled and pressed', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<DatePicker onChange={handleChange} disabled />);
    fireEvent.press(getByRole('button'));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
