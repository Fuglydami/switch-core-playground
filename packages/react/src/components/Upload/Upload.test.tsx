import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Upload } from './Upload';
import type { UploadFile } from './Upload';

const uploading: UploadFile[] = [
  { id: '1', name: 'report.pdf', size: 2_000_000, status: 'uploading', progress: 50 },
];
const completed: UploadFile[] = [
  { id: '2', name: 'photo.png', size: 800_000, status: 'completed' },
];
const failed: UploadFile[] = [
  { id: '3', name: 'bad.bin', size: 100_000, status: 'failed', errorMessage: 'Upload failed.' },
];

describe('Upload', () => {
  it('renders the drop zone', () => {
    render(<Upload />);
    expect(screen.getByRole('button', { name: /upload files/i })).toBeInTheDocument();
  });

  it('renders uploading file with progress', () => {
    render(<Upload files={uploading} />);
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders completed file', () => {
    render(<Upload files={completed} />);
    expect(screen.getByText('photo.png')).toBeInTheDocument();
  });

  it('renders failed file with error message', () => {
    render(<Upload files={failed} />);
    expect(screen.getByText('Upload failed.')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const onRemove = vi.fn();
    render(<Upload files={completed} onRemove={onRemove} />);
    await userEvent.click(screen.getByRole('button', { name: /remove photo\.png/i }));
    expect(onRemove).toHaveBeenCalledWith('2');
  });

  it('calls onRetry when retry is clicked on failed file', async () => {
    const onRetry = vi.fn();
    render(<Upload files={failed} onRetry={onRetry} />);
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledWith('3');
  });

  it('drop zone is not interactive when disabled', () => {
    render(<Upload disabled />);
    expect(screen.getByRole('button', { name: /upload files/i })).toHaveAttribute('tabindex', '-1');
  });
});
