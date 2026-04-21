import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: 'We will never share your email',
  },
};

export const Error: Story = {
  args: {
    isError: true,
    errorMessage: 'Invalid email address',
    value: 'invalid-email',
  },
};

export const Success: Story = {
  args: {
    isSuccess: true,
    successMessage: 'Email is available',
    value: 'user@example.com',
  },
};

export const Warning: Story = {
  args: {
    isWarning: true,
    warningMessage: 'This email is already registered',
    value: 'existing@example.com',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled@example.com',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Input label="Default" placeholder="Enter text" />
      <Input label="With Helper" placeholder="Enter text" helperText="Helper text" />
      <Input label="Error" isError errorMessage="Error message" value="Invalid" />
      <Input label="Success" isSuccess successMessage="Success!" value="Valid" />
      <Input label="Disabled" disabled value="Cannot edit" />
    </div>
  ),
};
