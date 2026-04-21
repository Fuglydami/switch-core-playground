import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DatePicker } from './DatePicker';

const noop = () => {};

// Pin "today" for deterministic tests
const TODAY = new Date(2024, 3, 15); // 15 Apr 2024

beforeEach(() => {
  vi.setSystemTime(TODAY);
});

describe('DatePicker', () => {
  it('renders the trigger button with placeholder', () => {
    render(<DatePicker onChange={noop} placeholder="Pick a date" />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('renders formatted value when date is provided', () => {
    render(<DatePicker value={new Date(2024, 0, 20)} onChange={noop} />);
    expect(screen.getByText(/20 Jan 2024/i)).toBeInTheDocument();
  });

  it('opens the calendar on trigger click', () => {
    render(<DatePicker onChange={noop} />);
    fireEvent.click(screen.getByRole('button', { name: /select a date/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onChange and closes calendar when a day is selected', () => {
    const handleChange = vi.fn();
    render(<DatePicker onChange={handleChange} />);
    fireEvent.click(screen.getByRole('button', { name: /select a date/i }));
    // click day 10 in the current month view - aria-label is "Wednesday, 10 April 2024"
    const dayBtn = screen.getByRole('gridcell', { name: /10 April 2024/i });
    fireEvent.click(dayBtn);
    expect(handleChange).toHaveBeenCalledWith(new Date(2024, 3, 10));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('navigates to previous month', () => {
    render(<DatePicker onChange={noop} />);
    fireEvent.click(screen.getByRole('button', { name: /select a date/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous month/i }));
    expect(screen.getByText(/March 2024/i)).toBeInTheDocument();
  });

  it('navigates to next month', () => {
    render(<DatePicker onChange={noop} />);
    fireEvent.click(screen.getByRole('button', { name: /select a date/i }));
    fireEvent.click(screen.getByRole('button', { name: /next month/i }));
    expect(screen.getByText(/May 2024/i)).toBeInTheDocument();
  });

  it('disables days before minDate', () => {
    render(<DatePicker onChange={noop} minDate={new Date(2024, 3, 10)} />);
    fireEvent.click(screen.getByRole('button', { name: /select a date/i }));
    // aria-label is "Friday, 5 April 2024" - use exact match to avoid 15/25
    const day5 = screen.getByRole('gridcell', { name: /Friday, 5 April 2024/i });
    expect(day5).toBeDisabled();
  });

  it('renders label and associates it with the trigger', () => {
    render(<DatePicker label="Departure date" onChange={noop} />);
    expect(screen.getByLabelText('Departure date')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<DatePicker onChange={noop} isError errorMessage="Invalid date" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid date');
  });

  it('does not open when disabled', () => {
    render(<DatePicker onChange={noop} disabled />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
