import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Upload, UploadFile } from './Upload';

const meta: Meta<typeof Upload> = {
  title: 'Components/Upload',
  component: Upload,
  args: {
    accept: 'image/*,.pdf,.doc,.docx',
    maxSize: 5 * 1024 * 1024,
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Default: Story = {};

export const WithFiles: Story = {
  args: {
    files: [
      { id: '1', name: 'document.pdf', size: 524288, status: 'completed' },
      { id: '2', name: 'image.png', size: 2097152, status: 'uploading', progress: 45 },
      { id: '3', name: 'report.xlsx', size: 102400, status: 'failed', errorMessage: 'Network error' },
    ],
    onRemove: (id) => console.log('Remove:', id),
    onRetry: (id) => console.log('Retry:', id),
  },
};

export const Interactive: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleFilesAdded = (newFiles: File[]) => {
      const uploadFiles: UploadFile[] = newFiles.map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        size: f.size,
        status: 'uploading',
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...uploadFiles]);

      // Simulate upload progress
      uploadFiles.forEach((uf) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 20;
          if (progress >= 100) {
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uf.id ? { ...f, status: 'completed', progress: 100 } : f
              )
            );
          } else {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uf.id ? { ...f, progress: Math.min(progress, 99) } : f
              )
            );
          }
        }, 200);
      });
    };

    const handleRemove = (id: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    return (
      <Upload
        accept="image/*,.pdf"
        maxSize={10 * 1024 * 1024}
        files={files}
        onFilesAdded={handleFilesAdded}
        onRemove={handleRemove}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ImageOnly: Story = {
  args: {
    accept: 'image/*',
    maxSize: 2 * 1024 * 1024,
  },
};
