import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'primary', 'secondary'],
    },
  },
  args: {
    title: 'Alert Title',
    children: 'This is the alert message content.',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your information before continuing.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    title: 'Primary',
    children: 'This is a primary alert message.',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    title: 'Secondary',
    children: 'This is a secondary alert message.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    onDismiss: () => console.log('Dismissed'),
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    title: undefined,
    children: 'Alert without a title.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Alert variant="info" title="Information">
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please proceed with caution.
      </Alert>
      <Alert variant="danger" title="Danger">
        An error occurred.
      </Alert>
      <Alert variant="primary" title="Primary">
        Primary alert style.
      </Alert>
      <Alert variant="secondary" title="Secondary">
        Secondary alert style.
      </Alert>
    </div>
  ),
};
