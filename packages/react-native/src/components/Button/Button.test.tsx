import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import { Button } from './Button';

describe('Button (RN)', () => {
  it('renders label text', () => {
    const { getByText } = render(<Button>Tap me</Button>);
    expect(getByText('Tap me')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Tap</Button>);
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is not pressable when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button disabled onPress={onPress}>Tap</Button>);
    fireEvent.press(getByText('Tap'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders ActivityIndicator when loading', () => {
    const { UNSAFE_getByType } = render(<Button isLoading>Tap</Button>);
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('does not render children text when loading', () => {
    const { queryByText } = render(<Button isLoading>Loading</Button>);
    expect(queryByText('Loading')).toBeNull();
  });

  it('renders leftIcon', () => {
    const Icon = () => null;
    const { UNSAFE_getByType } = render(<Button leftIcon={<Icon />}>Label</Button>);
    expect(UNSAFE_getByType(Icon)).toBeTruthy();
  });
});
