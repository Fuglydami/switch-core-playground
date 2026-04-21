import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Upload, UploadFile } from './Upload';

const mockFiles: UploadFile[] = [
  { id: '1', name: 'document.pdf', size: 1024 * 500, status: 'idle' },
  { id: '2', name: 'image.png', size: 1024 * 1024 * 2, status: 'uploading', progress: 45 },
  { id: '3', name: 'report.xlsx', size: 1024 * 200, status: 'completed' },
  { id: '4', name: 'data.csv', size: 1024 * 50, status: 'failed', errorMessage: 'Network error' },
];

describe('Upload (RN)', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Upload />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders upload zone with accessibility', () => {
    const { getByLabelText } = render(<Upload />);
    expect(getByLabelText('Upload files')).toBeTruthy();
  });

  it('calls onPickFiles when zone is pressed', () => {
    const onPickFiles = jest.fn();
    const { getByLabelText } = render(<Upload onPickFiles={onPickFiles} />);
    fireEvent.press(getByLabelText('Upload files'));
    expect(onPickFiles).toHaveBeenCalled();
  });

  it('does not call onPickFiles when disabled', () => {
    const onPickFiles = jest.fn();
    const { getByLabelText } = render(<Upload onPickFiles={onPickFiles} disabled />);
    fireEvent.press(getByLabelText('Upload files'));
    expect(onPickFiles).not.toHaveBeenCalled();
  });

  it('displays accept hint', () => {
    const { getByText } = render(<Upload accept="image/*,.pdf" />);
    expect(getByText('image/*, .pdf')).toBeTruthy();
  });

  it('displays max size hint', () => {
    const { getByText } = render(<Upload maxSize={1024 * 1024 * 5} />);
    expect(getByText('max 5.0 MB')).toBeTruthy();
  });

  it('displays combined hint', () => {
    const { getByText } = render(<Upload accept=".pdf" maxSize={1024 * 1024} />);
    expect(getByText('.pdf · max 1.0 MB')).toBeTruthy();
  });

  it('renders file list', () => {
    const { getByText } = render(<Upload files={mockFiles} />);
    expect(getByText('document.pdf')).toBeTruthy();
    expect(getByText('image.png')).toBeTruthy();
    expect(getByText('report.xlsx')).toBeTruthy();
    expect(getByText('data.csv')).toBeTruthy();
  });

  it('shows file sizes', () => {
    const { getByText } = render(<Upload files={[mockFiles[0]]} />);
    expect(getByText('500.0 KB')).toBeTruthy();
  });

  it('shows upload progress', () => {
    const { getByText } = render(<Upload files={[mockFiles[1]]} />);
    expect(getByText('45%')).toBeTruthy();
  });

  it('shows error message for failed files', () => {
    const { getByText } = render(<Upload files={[mockFiles[3]]} />);
    expect(getByText('Network error')).toBeTruthy();
  });

  it('calls onRemove when remove button is pressed', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = render(
      <Upload files={[mockFiles[0]]} onRemove={onRemove} />
    );
    fireEvent.press(getByLabelText('Remove document.pdf'));
    expect(onRemove).toHaveBeenCalledWith('1');
  });

  it('calls onRetry when retry button is pressed', () => {
    const onRetry = jest.fn();
    const { getByLabelText } = render(
      <Upload files={[mockFiles[3]]} onRetry={onRetry} />
    );
    fireEvent.press(getByLabelText('Retry uploading data.csv'));
    expect(onRetry).toHaveBeenCalledWith('4');
  });

  it('shows retry button only for failed files', () => {
    const onRetry = jest.fn();
    const { queryByLabelText, rerender } = render(
      <Upload files={[mockFiles[0]]} onRetry={onRetry} />
    );
    // Idle file should not have retry
    expect(queryByLabelText('Retry uploading document.pdf')).toBeNull();

    // Failed file should have retry
    rerender(<Upload files={[mockFiles[3]]} onRetry={onRetry} />);
    expect(queryByLabelText('Retry uploading data.csv')).toBeTruthy();
  });

  it('renders when disabled', () => {
    const { toJSON } = render(<Upload disabled />);
    expect(toJSON()).toBeTruthy();
  });

  it('formats bytes correctly', () => {
    const smallFile: UploadFile = { id: 's', name: 'small.txt', size: 500, status: 'idle' };
    const kbFile: UploadFile = { id: 'k', name: 'kb.txt', size: 2048, status: 'idle' };
    const mbFile: UploadFile = { id: 'm', name: 'mb.txt', size: 1024 * 1024 * 3, status: 'idle' };

    const { getByText, rerender } = render(<Upload files={[smallFile]} />);
    expect(getByText('500 B')).toBeTruthy();

    rerender(<Upload files={[kbFile]} />);
    expect(getByText('2.0 KB')).toBeTruthy();

    rerender(<Upload files={[mbFile]} />);
    expect(getByText('3.0 MB')).toBeTruthy();
  });
});
