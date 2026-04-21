import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Toast } from './Toast';

describe('Toast (RN)', () => {
  it('renders message text', () => {
    const { getByText } = render(<Toast type="info" message="Hello" />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders description when provided', () => {
    const { getByText } = render(
      <Toast type="success" message="Done" description="All good." />
    );
    expect(getByText('All good.')).toBeTruthy();
  });

  it('renders dismiss button when onDismiss provided', () => {
    const { getByLabelText } = render(
      <Toast type="error" message="Oops" onDismiss={jest.fn()} />
    );
    expect(getByLabelText('Dismiss notification')).toBeTruthy();
  });

  it('calls onDismiss when dismiss pressed', () => {
    const onDismiss = jest.fn();
    const { getByLabelText } = render(
      <Toast type="warning" message="Warn" onDismiss={onDismiss} />
    );
    fireEvent.press(getByLabelText('Dismiss notification'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button without onDismiss', () => {
    const { queryByLabelText } = render(<Toast type="info" message="No dismiss" />);
    expect(queryByLabelText('Dismiss notification')).toBeNull();
  });
});
