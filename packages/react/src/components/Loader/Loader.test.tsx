import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RingLoader, ProgressBar, StepProgress } from './Loader';

describe('RingLoader', () => {
  it('renders as progressbar when indeterminate', () => {
    render(<RingLoader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders as progressbar with value when progress set', () => {
    render(<RingLoader progress={50} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders complete state at progress=100', () => {
    render(<RingLoader progress={100} />);
    expect(screen.getByRole('img', { name: /complete/i })).toBeInTheDocument();
  });

  it('uses custom aria-label', () => {
    render(<RingLoader aria-label="Uploading file" />);
    expect(screen.getByRole('progressbar', { name: /uploading file/i })).toBeInTheDocument();
  });
});

describe('ProgressBar', () => {
  it('renders progressbar', () => {
    render(<ProgressBar value={60} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('reflects value in aria-valuenow', () => {
    render(<ProgressBar value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps value to 0–100', () => {
    render(<ProgressBar value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('renders label', () => {
    render(<ProgressBar value={50} label="Uploading" />);
    expect(screen.getByText('Uploading')).toBeInTheDocument();
  });

  it('renders percentage when showPercent', () => {
    render(<ProgressBar value={42} showPercent />);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('renders trailing label override', () => {
    render(<ProgressBar value={30} trailingLabel="Weak" />);
    expect(screen.getByText('Weak')).toBeInTheDocument();
  });
});

describe('StepProgress', () => {
  const steps = [
    { id: '1', label: 'Name', description: 'Enter your name' },
    { id: '2', label: 'Company', description: 'Company details' },
    { id: '3', label: 'Invite', description: 'Invite team' },
  ];

  it('renders all step labels', () => {
    render(<StepProgress steps={steps} activeIndex={1} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Invite')).toBeInTheDocument();
  });

  it('marks active step with aria-current', () => {
    render(<StepProgress steps={steps} activeIndex={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
  });

  it('does not mark non-active steps with aria-current', () => {
    render(<StepProgress steps={steps} activeIndex={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).not.toHaveAttribute('aria-current');
    expect(items[2]).not.toHaveAttribute('aria-current');
  });

  it('renders vertical orientation', () => {
    const { container } = render(<StepProgress steps={steps} activeIndex={0} orientation="vertical" />);
    expect(container.firstChild?.className).toMatch(/vertical/);
  });
});
