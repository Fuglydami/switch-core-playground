import React from 'react';
import { render } from '@testing-library/react-native';
import { Divider } from './Divider';

describe('Divider (RN)', () => {
  it('renders horizontal divider by default', () => {
    const { getByLabelText } = render(<Divider />);
    expect(getByLabelText('Separator')).toBeTruthy();
  });

  it('renders vertical divider', () => {
    const { getByLabelText } = render(<Divider orientation="vertical" />);
    expect(getByLabelText('Separator')).toBeTruthy();
  });

  it('renders labelled divider', () => {
    const { getByText, getByLabelText } = render(<Divider label="Today" />);
    expect(getByText('Today')).toBeTruthy();
    expect(getByLabelText('Separator: Today')).toBeTruthy();
  });

  it('renders without label when not provided', () => {
    const { queryByText } = render(<Divider />);
    expect(queryByText('Today')).toBeNull();
  });

  it('horizontal divider has accessibilityRole none', () => {
    const { getByLabelText } = render(<Divider />);
    const divider = getByLabelText('Separator');
    expect(divider.props.accessibilityRole).toBe('none');
  });

  it('vertical divider has accessibilityRole none', () => {
    const { getByLabelText } = render(<Divider orientation="vertical" />);
    const divider = getByLabelText('Separator');
    expect(divider.props.accessibilityRole).toBe('none');
  });
});
