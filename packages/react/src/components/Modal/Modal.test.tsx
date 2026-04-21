import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

// jsdom doesn't support <dialog> showModal/close; we shim it
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

describe('Modal', () => {
  it('renders title when open', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Confirm">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="T">
        <p>Modal body</p>
      </Modal>
    );
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Hidden">
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="T">
        <p>Content</p>
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders primary action button', async () => {
    const onPress = vi.fn();
    render(
      <Modal isOpen onClose={vi.fn()} title="T" primaryAction={{ label: 'Confirm', onPress }}>
        <p>Content</p>
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('renders secondary action button', async () => {
    const onPress = vi.fn();
    render(
      <Modal
        isOpen
        onClose={vi.fn()}
        title="T"
        secondaryAction={{ label: 'Cancel', onPress }}
      >
        <p>Content</p>
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onPress).toHaveBeenCalledOnce();
  });
});
