import type { Meta, StoryObj } from '@storybook/react';
import { HelperText } from './HelperText';

const meta: Meta<typeof HelperText> = {
  title: 'Components/HelperText',
  component: HelperText,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'error'],
    },
  },
  args: {
    text: 'This is helper text that provides additional context.',
  },
};

export default meta;
type Story = StoryObj<typeof HelperText>;

export const Info: Story = {
  args: {
    variant: 'info',
    text: 'This is an informational message.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    text: 'Please review this information carefully.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    text: 'There was an error processing your request.',
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    text: 'Custom icon example.',
    icon: <span>💡</span>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <HelperText variant="info" text="This is an informational message." />
      <HelperText variant="warning" text="Please review this information carefully." />
      <HelperText variant="error" text="There was an error processing your request." />
    </div>
  ),
};
