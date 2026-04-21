import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox, Radio, Toggle } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Checkbox label="Check" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('checks on click', async () => {
    render(<Checkbox label="Check" />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Check" onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop set', () => {
    render(<Checkbox label="Check" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<Checkbox label="Check" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio label="Yes" name="q" value="yes" />);
    expect(screen.getByLabelText('Yes')).toBeInTheDocument();
  });

  it('is a radio input', () => {
    render(<Radio label="Yes" name="q" value="yes" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('is disabled when disabled prop set', () => {
    render(<Radio label="Yes" name="q" value="yes" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });
});

describe('Toggle', () => {
  it('renders with label', () => {
    render(<Toggle label="Notifications" />);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  it('has role=switch', () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    render(<Toggle label="Dark mode" />);
    const sw = screen.getByRole('switch');
    expect(sw).not.toBeChecked();
    await userEvent.click(sw);
    expect(sw).toBeChecked();
  });

  it('is disabled when disabled prop set', () => {
    render(<Toggle label="Toggle" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
