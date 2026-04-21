import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Slider, RangeSlider } from './Slider';

describe('Slider', () => {
  it('renders a range input', () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole('slider', { name: /volume/i })).toBeInTheDocument();
  });

  it('reflects defaultValue', () => {
    render(<Slider defaultValue={40} aria-label="Volume" />);
    expect(screen.getByRole('slider')).toHaveValue('40');
  });

  it('reflects controlled value', () => {
    render(<Slider value={70} onChange={() => {}} aria-label="Volume" />);
    expect(screen.getByRole('slider')).toHaveValue('70');
  });

  it('calls onChange on input', () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={0} onChange={onChange} aria-label="Volume" min={0} max={100} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '50' } });
    expect(onChange).toHaveBeenCalledWith(50);
  });

  it('shows min/max labels when showLabels', () => {
    render(<Slider showLabels min={0} max={100} aria-label="Volume" />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('formats labels with formatLabel', () => {
    render(<Slider showLabels min={0} max={1000000} formatLabel={(v) => `₦${v}`} aria-label="Price" />);
    expect(screen.getByText('₦0')).toBeInTheDocument();
    expect(screen.getByText('₦1000000')).toBeInTheDocument();
  });

  it('is disabled when disabled prop set', () => {
    render(<Slider disabled aria-label="Volume" />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});

describe('RangeSlider', () => {
  it('renders two range inputs', () => {
    render(<RangeSlider />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('low handle has aria-label "Minimum value"', () => {
    render(<RangeSlider />);
    expect(screen.getByRole('slider', { name: /minimum value/i })).toBeInTheDocument();
  });

  it('high handle has aria-label "Maximum value"', () => {
    render(<RangeSlider />);
    expect(screen.getByRole('slider', { name: /maximum value/i })).toBeInTheDocument();
  });

  it('shows labels when showLabels', () => {
    render(<RangeSlider showLabels defaultValue={[20, 80]} min={0} max={100} />);
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });
});
