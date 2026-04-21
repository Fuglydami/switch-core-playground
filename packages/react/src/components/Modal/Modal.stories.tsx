import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setOpen(true)} variant="primary" colorScheme="activeBlue">
          Open Modal
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm action"
          primaryAction={{ label: 'Confirm', onPress: () => setOpen(false) }}
          secondaryAction={{ label: 'Cancel', onPress: () => setOpen(false) }}
        >
          <p>Are you sure you want to perform this action? This cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

export const WithLoadingAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => { setLoading(false); setOpen(false); }, 2000);
    };
    return (
      <>
        <Button onPress={() => setOpen(true)} variant="primary" colorScheme="activeBlue">
          Open Modal
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Delete record"
          primaryAction={{ label: 'Delete', onPress: handleConfirm, isLoading: loading }}
          secondaryAction={{ label: 'Cancel', onPress: () => setOpen(false) }}
        >
          <p>This will permanently delete the record. Are you sure?</p>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'small' | 'medium' | 'large' | null>(null);
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onPress={() => setSize('small')} variant="outline">Small</Button>
        <Button onPress={() => setSize('medium')} variant="outline">Medium</Button>
        <Button onPress={() => setSize('large')} variant="outline">Large</Button>
        {size && (
          <Modal
            isOpen={Boolean(size)}
            onClose={() => setSize(null)}
            title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
            size={size}
            primaryAction={{ label: 'Close', onPress: () => setSize(null) }}
          >
            <p>This is a {size} sized modal.</p>
          </Modal>
        )}
      </div>
    );
  },
};

export const ContentOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setOpen(true)} variant="primary" colorScheme="activeBlue">
          Open Modal
        </Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Information">
          <p>This modal only has content and no action buttons.</p>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setOpen(true)} variant="primary" colorScheme="activeBlue">
          Open Modal
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Important Notice"
          showCloseButton={false}
          primaryAction={{ label: 'I Understand', onPress: () => setOpen(false) }}
        >
          <p>This modal requires acknowledgement before closing.</p>
        </Modal>
      </>
    );
  },
};
