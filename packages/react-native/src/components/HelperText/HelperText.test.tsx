import React from 'react';
import { render } from '@testing-library/react-native';
import { HelperText } from './HelperText';

describe('HelperText (RN)', () => {
  it('renders text', () => {
    const { getByText } = render(<HelperText text="This is helpful." />);
    expect(getByText('This is helpful.')).toBeTruthy();
  });

  it('renders all variants without crashing', () => {
    const variants: Array<'info' | 'warning' | 'error'> = ['info', 'warning', 'error'];
    variants.forEach((variant) => {
      const { getByText } = render(<HelperText text="msg" variant={variant} />);
      expect(getByText('msg')).toBeTruthy();
    });
  });

  it('renders custom icon', () => {
    const Icon = () => null;
    const { UNSAFE_getByType } = render(
      <HelperText text="with icon" icon={<Icon />} />
    );
    expect(UNSAFE_getByType(Icon)).toBeTruthy();
  });
});
