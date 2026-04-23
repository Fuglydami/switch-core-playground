import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Button } from '../Button/Button';

const meta: Meta<typeof PageHeader> = {
  title: 'Composite/PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component: `
A page header with title, breadcrumbs, and action buttons.

## Quick Start
\`\`\`tsx
import { PageHeader, Button } from '@switch/react';

<PageHeader
  title="Users"
  subtitle="Manage your team members"
  breadcrumbs={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'users', label: 'Users' },
  ]}
  actions={<Button>Add User</Button>}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title',
    },
    subtitle: {
      control: 'text',
      description: 'Page subtitle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Team Members',
    subtitle: 'Manage your organization\'s team members and their permissions',
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: 'Edit User',
    breadcrumbs: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'users', label: 'Users', href: '/users' },
      { id: 'edit', label: 'Edit User' },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: 'Products',
    subtitle: '48 products in catalog',
    actions: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="outline">Export</Button>
        <Button>Add Product</Button>
      </div>
    ),
  },
};

export const WithBackButton: Story = {
  args: {
    title: 'Order Details',
    subtitle: 'Order #12345',
    onBack: () => console.log('Back clicked'),
  },
};

export const FullExample: Story = {
  args: {
    title: 'Transaction Details',
    subtitle: 'View and manage transaction information',
    breadcrumbs: [
      { id: 'home', label: 'Dashboard', href: '/' },
      { id: 'transactions', label: 'Transactions', href: '/transactions' },
      { id: 'detail', label: 'TXN-2024-001234' },
    ],
    actions: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="outline">Download</Button>
        <Button variant="outline">Print</Button>
        <Button>Refund</Button>
      </div>
    ),
    onBack: () => console.log('Back clicked'),
  },
};

export const WithChildren: Story = {
  args: {
    title: 'Analytics',
    subtitle: 'Track your performance metrics',
    children: (
      <div style={{
        display: 'flex',
        gap: 24,
        marginTop: 16,
        padding: 16,
        background: '#f9fafb',
        borderRadius: 8,
      }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>12,345</div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>Total Users</div>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>$45,678</div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>Revenue</div>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>98.5%</div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>Uptime</div>
        </div>
      </div>
    ),
  },
};
