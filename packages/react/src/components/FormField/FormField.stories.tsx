import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Composite/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component: `
A form field combining label, input, and helper/error text.

## Quick Start
\`\`\`tsx
import { FormField } from '@switch/react';

<FormField
  label="Email"
  name="email"
  type="email"
  placeholder="Enter your email"
  required
/>
\`\`\`

## With Validation
\`\`\`tsx
<FormField
  label="Password"
  name="password"
  type="password"
  error={errors.password}
  helperText="Must be at least 8 characters"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'select'],
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Input size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    name: 'fullName',
    placeholder: 'Enter your full name',
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters with one uppercase letter',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
    required: true,
  },
};

export const SelectField: Story = {
  args: {
    label: 'Country',
    name: 'country',
    type: 'select',
    placeholder: 'Select a country',
    options: [
      { label: 'Nigeria', value: 'NG' },
      { label: 'United States', value: 'US' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Canada', value: 'CA' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    name: 'username',
    value: 'john.doe',
    disabled: true,
    helperText: 'Username cannot be changed',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      <FormField
        label="Text"
        name="text"
        type="text"
        placeholder="Enter text"
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
      />
      <FormField
        label="Number"
        name="number"
        type="number"
        placeholder="0"
      />
      <FormField
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+234 800 000 0000"
      />
      <FormField
        label="Website"
        name="url"
        type="url"
        placeholder="https://example.com"
      />
      <FormField
        label="Country"
        name="country"
        type="select"
        placeholder="Select country"
        options={[
          { label: 'Nigeria', value: 'NG' },
          { label: 'Ghana', value: 'GH' },
          { label: 'Kenya', value: 'KE' },
        ]}
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}>
      <FormField
        label="First Name"
        name="firstName"
        placeholder="John"
        required
      />
      <FormField
        label="Last Name"
        name="lastName"
        placeholder="Doe"
        required
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="john.doe@example.com"
        required
      />
      <FormField
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="+234 800 000 0000"
        helperText="We'll use this to contact you"
      />
      <FormField
        label="Account Type"
        name="accountType"
        type="select"
        placeholder="Select account type"
        options={[
          { label: 'Personal', value: 'personal' },
          { label: 'Business', value: 'business' },
          { label: 'Enterprise', value: 'enterprise' },
        ]}
        required
      />
    </form>
  ),
};
