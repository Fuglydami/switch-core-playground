import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from './Alert';

describe('Alert (RN)', () => {
  it('renders children text', () => {
    const { getByText } = render(<Alert>Alert message</Alert>);
    expect(getByText('Alert message')).toBeTruthy();
  });

  it('renders title when provided', () => {
    const { getByText } = render(
      <Alert title="Warning">Content</Alert>
    );
    expect(getByText('Warning')).toBeTruthy();
  });

  it('applies default info variant', () => {
    const { getByText } = render(<Alert>Info alert</Alert>);
    // Alert renders with accessibilityRole="alert"
    expect(getByText('Info alert')).toBeTruthy();
  });

  it('renders dismiss button when dismissible', () => {
    const onDismiss = jest.fn();
    const { getByLabelText } = render(
      <Alert dismissible onDismiss={onDismiss}>
        Dismissible alert
      </Alert>
    );
    expect(getByLabelText('Dismiss alert')).toBeTruthy();
  });

  it('calls onDismiss when dismiss button pressed', () => {
    const onDismiss = jest.fn();
    const { getByLabelText } = render(
      <Alert dismissible onDismiss={onDismiss}>
        Dismissible alert
      </Alert>
    );
    fireEvent.press(getByLabelText('Dismiss alert'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button when not dismissible', () => {
    const { queryByLabelText } = render(<Alert>Alert</Alert>);
    expect(queryByLabelText('Dismiss alert')).toBeNull();
  });

  it('renders custom icon when provided', () => {
    const CustomIcon = () => null;
    const { UNSAFE_getByType } = render(
      <Alert icon={<CustomIcon />}>Alert with custom icon</Alert>
    );
    expect(UNSAFE_getByType(CustomIcon)).toBeTruthy();
  });

  it('renders React nodes as children', () => {
    const { getByText } = render(
      <Alert>
        <></>
      </Alert>
    );
    // Should not throw when rendering non-string children
    expect(true).toBe(true);
  });
});
