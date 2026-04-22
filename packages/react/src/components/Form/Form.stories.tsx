import type { Meta, StoryObj } from '@storybook/react';
import { Form, validators } from './Form';
import { Button } from '../Button/Button';

const meta: Meta<typeof Form> = {
  title: 'Composite/Form',
  component: Form,
  parameters: {
    docs: {
      description: {
        component: `
A form component with built-in validation and submission handling.

## Quick Start
\`\`\`tsx
import { Form, validators } from '@switch/react';

<Form
  initialValues={{ email: '', password: '' }}
  validationSchema={{
    email: [validators.required(), validators.email()],
    password: [validators.required(), validators.minLength(8)],
  }}
  onSubmit={async (values) => {
    await login(values);
  }}
>
  <Form.Field name="email" label="Email" type="email" />
  <Form.Field name="password" label="Password" type="password" />
  <Form.Submit>
    <Button type="submit">Sign In</Button>
  </Form.Submit>
</Form>
\`\`\`

## Available Validators
- \`validators.required(message?)\`
- \`validators.email(message?)\`
- \`validators.minLength(min, message?)\`
- \`validators.maxLength(max, message?)\`
- \`validators.pattern(regex, message)\`
- \`validators.match(fieldName, message?)\`
- \`validators.phone(message?)\`
- \`validators.number(message?)\`
- \`validators.min(value, message?)\`
- \`validators.max(value, message?)\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const LoginForm: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Form
        initialValues={{ email: '', password: '' }}
        validationSchema={{
          email: [validators.required('Email is required'), validators.email()],
          password: [validators.required('Password is required')],
        }}
        onSubmit={async (values) => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert(`Login: ${JSON.stringify(values)}`);
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Form.Field
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            rules={[validators.required('Email is required'), validators.email()]}
          />
          <Form.Field
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            rules={[validators.required('Password is required')]}
          />
          <Form.Submit>
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </Form.Submit>
        </div>
      </Form>
    </div>
  ),
};

export const RegistrationForm: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Form
        onSubmit={async (values) => {
          await new Promise(resolve => setTimeout(resolve, 1500));
          alert(`Registration: ${JSON.stringify(values)}`);
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Form.Field
            name="firstName"
            label="First Name"
            placeholder="John"
            rules={[validators.required()]}
            required
          />
          <Form.Field
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            rules={[validators.required()]}
            required
          />
          <Form.Field
            name="email"
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            rules={[validators.required(), validators.email()]}
            required
          />
          <Form.Field
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="+234 800 000 0000"
            rules={[validators.phone()]}
          />
          <Form.Field
            name="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            rules={[validators.required(), validators.minLength(8, 'Password must be at least 8 characters')]}
            required
          />
          <Form.Field
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            rules={[validators.required(), validators.match('password', 'Passwords must match')]}
            required
          />
          <Form.Submit>
            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </Form.Submit>
        </div>
      </Form>
    </div>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <Form
        onSubmit={async (values) => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert(`Contact form submitted: ${JSON.stringify(values)}`);
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Field
              name="firstName"
              label="First Name"
              placeholder="John"
              rules={[validators.required()]}
              required
            />
            <Form.Field
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              rules={[validators.required()]}
              required
            />
          </div>
          <Form.Field
            name="email"
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            rules={[validators.required(), validators.email()]}
            required
            fullWidth
          />
          <Form.Field
            name="subject"
            label="Subject"
            type="select"
            placeholder="Select a subject"
            options={[
              { label: 'General Inquiry', value: 'general' },
              { label: 'Technical Support', value: 'support' },
              { label: 'Sales', value: 'sales' },
              { label: 'Partnership', value: 'partnership' },
            ]}
            rules={[validators.required()]}
            required
            fullWidth
          />
          <Form.Submit>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                Send Message
              </Button>
            </div>
          </Form.Submit>
        </div>
      </Form>
    </div>
  ),
};

export const ProfileForm: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Form
        initialValues={{
          name: 'John Doe',
          email: 'john.doe@example.com',
          timezone: 'UTC',
        }}
        onSubmit={async (values) => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert(`Profile updated: ${JSON.stringify(values)}`);
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Form.Field
            name="name"
            label="Display Name"
            rules={[validators.required(), validators.minLength(2)]}
            required
          />
          <Form.Field
            name="email"
            label="Email"
            type="email"
            rules={[validators.required(), validators.email()]}
            required
            disabled
          />
          <Form.Field
            name="timezone"
            label="Timezone"
            type="select"
            options={[
              { label: 'UTC', value: 'UTC' },
              { label: 'Africa/Lagos (WAT)', value: 'Africa/Lagos' },
              { label: 'America/New_York (EST)', value: 'America/New_York' },
              { label: 'Europe/London (GMT)', value: 'Europe/London' },
            ]}
          />
          <Form.Submit>
            <Button type="submit">
              Save Changes
            </Button>
          </Form.Submit>
        </div>
      </Form>
    </div>
  ),
};
