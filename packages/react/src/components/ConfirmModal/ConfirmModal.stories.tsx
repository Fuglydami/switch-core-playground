import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmModal } from './ConfirmModal';
import { Button } from '../Button/Button';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Composite/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    docs: {
      description: {
        component: `
A confirmation dialog for destructive or important actions.

## Quick Start
\`\`\`tsx
import { ConfirmModal } from '@switch/react';

const [isOpen, setIsOpen] = useState(false);

<ConfirmModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={() => {
    handleDelete();
    setIsOpen(false);
  }}
  title="Delete item?"
  description="This action cannot be undone."
  variant="danger"
  confirmText="Delete"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal title',
    },
    description: {
      control: 'text',
      description: 'Modal description',
    },
    confirmText: {
      control: 'text',
      description: 'Confirm button text',
    },
    cancelText: {
      control: 'text',
      description: 'Cancel button text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'danger'],
      description: 'Confirm button style',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open Confirm Modal</Button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('Confirmed!');
            setIsOpen(false);
          }}
          title="Confirm action"
          description="Are you sure you want to proceed with this action?"
        />
      </>
    );
  },
};

export const Danger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button colorScheme="monochrome" onPress={() => setIsOpen(true)}>Delete Item</Button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('Deleted!');
            setIsOpen(false);
          }}
          title="Delete this item?"
          description="This action cannot be undone. All associated data will be permanently removed."
          variant="danger"
          confirmText="Delete"
        />
      </>
    );
  },
};

export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      setIsOpen(false);
    };

    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Save changes?"
          description="Your changes will be saved to the server."
          isLoading={isLoading}
          confirmText="Save"
        />
      </>
    );
  },
};

export const CustomText: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Logout</Button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          title="Sign out of your account?"
          description="You will need to sign in again to access your data."
          confirmText="Sign out"
          cancelText="Stay signed in"
        />
      </>
    );
  },
};
