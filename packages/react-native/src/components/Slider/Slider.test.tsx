import React from 'react';
import { render } from '@testing-library/react-native';
import { Slider, RangeSlider } from './Slider';

// Note: Animated.View from Reanimated is mocked as plain View in tests,
// so accessibilityRole="adjustable" isn't preserved. Tests focus on
// what can be verified with the mocked environment.

describe('Slider (RN)', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Slider aria-label="Volume" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with default value', () => {
    const { toJSON } = render(<Slider aria-label="Volume" defaultValue={50} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with min and max values', () => {
    const { toJSON } = render(<Slider aria-label="Volume" min={10} max={200} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with controlled value', () => {
    const { toJSON } = render(<Slider aria-label="Volume" value={75} />);
    expect(toJSON()).toBeTruthy();
  });

  it('shows labels when showLabels is true', () => {
    const { getByText } = render(
      <Slider aria-label="Volume" min={0} max={100} showLabels />
    );
    expect(getByText('0')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
  });

  it('formats labels with custom formatter', () => {
    const { getByText } = render(
      <Slider
        aria-label="Price"
        min={0}
        max={100}
        showLabels
        formatLabel={(v) => `$${v}`}
      />
    );
    expect(getByText('$0')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();
  });

  it('renders in small size', () => {
    const { toJSON } = render(<Slider aria-label="Volume" size="small" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders in large size', () => {
    const { toJSON } = render(<Slider aria-label="Volume" size="large" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders when disabled', () => {
    const { toJSON } = render(<Slider aria-label="Volume" disabled />);
    expect(toJSON()).toBeTruthy();
  });

  it('accepts onChange callback', () => {
    const onChange = jest.fn();
    const { toJSON } = render(<Slider aria-label="Volume" onChange={onChange} />);
    expect(toJSON()).toBeTruthy();
  });
});

describe('RangeSlider (RN)', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<RangeSlider />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with specified default range', () => {
    const { toJSON } = render(<RangeSlider defaultValue={[25, 75]} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with controlled value', () => {
    const { toJSON } = render(<RangeSlider value={[30, 70]} />);
    expect(toJSON()).toBeTruthy();
  });

  it('shows labels when showLabels is true', () => {
    const { getByText } = render(
      <RangeSlider defaultValue={[20, 80]} showLabels />
    );
    expect(getByText('20')).toBeTruthy();
    expect(getByText('80')).toBeTruthy();
  });

  it('formats labels with custom formatter', () => {
    const { getByText } = render(
      <RangeSlider
        defaultValue={[10, 90]}
        showLabels
        formatLabel={(v) => `${v}%`}
      />
    );
    expect(getByText('10%')).toBeTruthy();
    expect(getByText('90%')).toBeTruthy();
  });

  it('renders in small size', () => {
    const { toJSON } = render(<RangeSlider size="small" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders in large size', () => {
    const { toJSON } = render(<RangeSlider size="large" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders when disabled', () => {
    const { toJSON } = render(<RangeSlider disabled />);
    expect(toJSON()).toBeTruthy();
  });
});
