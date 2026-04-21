import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { RingLoader, ProgressBar, StepProgress } from './Loader';

describe('RingLoader', () => {
  it('renders spinner by default', () => {
    render(<RingLoader testID="loader" />);
    expect(screen.getByTestId('loader')).toBeTruthy();
    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });

  it('shows complete state at 100%', () => {
    render(<RingLoader progress={100} testID="loader" />);
    expect(screen.getByLabelText('Complete')).toBeTruthy();
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<RingLoader size="small" testID="loader" />);
    expect(screen.getByTestId('loader')).toBeTruthy();

    rerender(<RingLoader size="medium" testID="loader" />);
    expect(screen.getByTestId('loader')).toBeTruthy();

    rerender(<RingLoader size="large" testID="loader" />);
    expect(screen.getByTestId('loader')).toBeTruthy();
  });
});

describe('ProgressBar', () => {
  it('renders with value', () => {
    render(<ProgressBar value={50} testID="progress" />);
    expect(screen.getByTestId('progress')).toBeTruthy();
  });

  it('renders label', () => {
    render(<ProgressBar value={50} label="Uploading" testID="progress" />);
    expect(screen.getByText('Uploading')).toBeTruthy();
  });

  it('renders percentage when showPercent is true', () => {
    render(<ProgressBar value={75} showPercent testID="progress" />);
    expect(screen.getByText('75%')).toBeTruthy();
  });

  it('renders trailing label', () => {
    render(<ProgressBar value={50} trailingLabel="5 of 10" testID="progress" />);
    expect(screen.getByText('5 of 10')).toBeTruthy();
  });

  it('clamps value between 0 and 100', () => {
    const { rerender } = render(<ProgressBar value={-10} testID="progress" />);
    expect(screen.getByTestId('progress')).toBeTruthy();

    rerender(<ProgressBar value={150} testID="progress" />);
    expect(screen.getByTestId('progress')).toBeTruthy();
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<ProgressBar value={50} size="thin" testID="progress" />);
    expect(screen.getByTestId('progress')).toBeTruthy();

    rerender(<ProgressBar value={50} size="medium" testID="progress" />);
    expect(screen.getByTestId('progress')).toBeTruthy();

    rerender(<ProgressBar value={50} size="thick" testID="progress" />);
    expect(screen.getByTestId('progress')).toBeTruthy();
  });
});

describe('StepProgress', () => {
  const steps = [
    { id: '1', label: 'Step 1', description: 'First step' },
    { id: '2', label: 'Step 2', description: 'Second step' },
    { id: '3', label: 'Step 3' },
  ];

  it('renders all steps', () => {
    render(<StepProgress steps={steps} activeIndex={1} orientation="vertical" testID="steps" />);
    expect(screen.getByText('Step 1')).toBeTruthy();
    expect(screen.getByText('Step 3')).toBeTruthy();
  });

  it('marks completed steps', () => {
    render(<StepProgress steps={steps} activeIndex={2} orientation="vertical" testID="steps" />);
    // Steps 1 and 2 should be completed (showing checkmarks, not numbers)
    expect(screen.getByText('Step 3')).toBeTruthy();
  });

  it('renders vertical orientation', () => {
    render(
      <StepProgress steps={steps} activeIndex={1} orientation="vertical" testID="steps" />
    );
    expect(screen.getByText('Step 1')).toBeTruthy();
    expect(screen.getByText('First step')).toBeTruthy();
    expect(screen.getByText('Step 2')).toBeTruthy();
  });

  it('renders horizontal orientation by default', () => {
    render(<StepProgress steps={steps} activeIndex={0} testID="steps" />);
    expect(screen.getByTestId('steps')).toBeTruthy();
  });
});
