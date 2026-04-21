import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('does not show tooltip by default', () => {
    render(
      <Tooltip content="Tip">
        <button>Hover</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    render(
      <Tooltip content="Helpful tip">
        <button>Hover</button>
      </Tooltip>
    );
    await userEvent.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Helpful tip')).toBeInTheDocument();
  });

  it('hides tooltip after unhover', async () => {
    render(
      <Tooltip content="Tip">
        <button>Hover</button>
      </Tooltip>
    );
    await userEvent.hover(screen.getByRole('button'));
    await userEvent.unhover(screen.getByRole('button'));
    // Tooltip has a 100ms delay before hiding
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    }, { timeout: 200 });
  });

  it('shows tooltip on focus', async () => {
    render(
      <Tooltip content="Focus tip">
        <button>Focus</button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('renders helper text', async () => {
    render(
      <Tooltip content="Main" helperText="Helper">
        <button>Hover</button>
      </Tooltip>
    );
    await userEvent.hover(screen.getByRole('button'));
    expect(screen.getByText('Helper')).toBeInTheDocument();
  });
});
