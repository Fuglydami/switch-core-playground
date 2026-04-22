export const templates = {
  blank: (name: string, kebab: string) => ({
    [`${name}.tsx`]: `'use client';

import React from 'react';
import { PageHeader, Card } from '@switch/react';
import styles from './${name}.module.css';

export default function ${name}Page() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="${name}"
        subtitle="Page description here"
      />

      <Card>
        <p>Your content here</p>
      </Card>
    </div>
  );
}
`,
    [`${name}.module.css`]: `.page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
`,
  }),

  dashboard: (name: string, kebab: string) => ({
    [`${name}.tsx`]: `'use client';

import React from 'react';
import { PageHeader, Card, Button, DataTable, Chip } from '@switch/react';
import styles from './${name}.module.css';

const stats = [
  { label: 'Total Users', value: '12,345', change: '+12%' },
  { label: 'Revenue', value: '$45,678', change: '+8%' },
  { label: 'Active Sessions', value: '1,234', change: '+23%' },
  { label: 'Conversion Rate', value: '3.2%', change: '-2%' },
];

const recentActivity = [
  { id: '1', user: 'John Doe', action: 'Created account', time: '2 min ago', status: 'Success' },
  { id: '2', user: 'Jane Smith', action: 'Made purchase', time: '5 min ago', status: 'Success' },
  { id: '3', user: 'Bob Wilson', action: 'Failed login', time: '10 min ago', status: 'Failed' },
];

export default function ${name}Page() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening."
        actions={<Button>Export Report</Button>}
      />

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <Card key={stat.label} padding="medium">
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statChange} data-positive={stat.change.startsWith('+')}>
              {stat.change}
            </p>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className={styles.activityCard}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <DataTable
          columns={[
            { id: 'user', header: 'User', accessor: 'user' },
            { id: 'action', header: 'Action', accessor: 'action' },
            { id: 'time', header: 'Time', accessor: 'time' },
            {
              id: 'status',
              header: 'Status',
              accessor: 'status',
              render: (val: string) => (
                <Chip
                  variant="outlined"
                  colorScheme={val === 'Success' ? 'green' : 'red'}
                  size="small"
                >
                  {val}
                </Chip>
              ),
            },
          ]}
          data={recentActivity}
        />
      </Card>
    </div>
  );
}
`,
    [`${name}.module.css`]: `.page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.statLabel {
  font-size: 14px;
  color: var(--switch-color-text-secondary);
  margin: 0 0 8px;
}

.statValue {
  font-size: 28px;
  font-weight: 700;
  color: var(--switch-color-text-primary);
  margin: 0 0 4px;
}

.statChange {
  font-size: 14px;
  margin: 0;
}

.statChange[data-positive="true"] {
  color: var(--switch-color-activegreen-500);
}

.statChange[data-positive="false"] {
  color: var(--switch-color-primaryred-500);
}

.activityCard {
  margin-top: 24px;
}

.sectionTitle {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px;
}
`,
  }),

  form: (name: string, kebab: string) => ({
    [`${name}.tsx`]: `'use client';

import React from 'react';
import { PageHeader, Card, Form, Button, validators } from '@switch/react';
import styles from './${name}.module.css';

export default function ${name}Page() {
  const handleSubmit = async (values: Record<string, any>) => {
    console.log('Form submitted:', values);
    // Handle form submission
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="${name}"
        subtitle="Fill in the form below"
      />

      <Card padding="large" className={styles.formCard}>
        <Form onSubmit={handleSubmit}>
          <Form.Field
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            rules={[validators.required()]}
            fullWidth
          />

          <Form.Field
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            rules={[validators.required(), validators.email()]}
            fullWidth
          />

          <Form.Field
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="+234 800 000 0000"
            rules={[validators.phone()]}
            fullWidth
          />

          <Form.Field
            name="country"
            label="Country"
            type="select"
            placeholder="Select a country"
            options={[
              { label: 'Nigeria', value: 'NG' },
              { label: 'Ghana', value: 'GH' },
              { label: 'Kenya', value: 'KE' },
            ]}
            rules={[validators.required()]}
            fullWidth
          />

          <Form.Submit>
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Form.Submit>
        </Form>
      </Card>
    </div>
  );
}
`,
    [`${name}.module.css`]: `.page {
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.formCard {
  margin-top: 24px;
}
`,
  }),

  table: (name: string, kebab: string) => ({
    [`${name}.tsx`]: `'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, Chip, ConfirmModal } from '@switch/react';
import styles from './${name}.module.css';

interface DataItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

const mockData: DataItem[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', createdAt: '2024-01-20' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Inactive', createdAt: '2024-02-01' },
  // Add more mock data...
];

export default function ${name}Page() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns = [
    { id: 'name', header: 'Name', accessor: 'name' as const },
    { id: 'email', header: 'Email', accessor: 'email' as const },
    { id: 'role', header: 'Role', accessor: 'role' as const },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status' as const,
      render: (val: string) => (
        <Chip
          variant="outlined"
          colorScheme={val === 'Active' ? 'green' : 'neutral'}
          size="small"
        >
          {val}
        </Chip>
      ),
    },
    { id: 'createdAt', header: 'Created', accessor: 'createdAt' as const },
  ];

  const handleDelete = () => {
    console.log('Deleting:', deleteId);
    setDeleteId(null);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="${name}"
        subtitle="Manage your data"
        actions={<Button>Add New</Button>}
      />

      <DataTable
        columns={columns}
        data={mockData}
        searchable
        searchPlaceholder="Search by name or email..."
        searchFields={['name', 'email']}
        paginated
        rowsPerPageOptions={[10, 25, 50]}
        onRowClick={(row) => console.log('Clicked:', row)}
      />

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
`,
    [`${name}.module.css`]: `.page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}
`,
  }),

  settings: (name: string, kebab: string) => ({
    [`${name}.tsx`]: `'use client';

import React, { useState } from 'react';
import { PageHeader, Card, Tabs, Form, Button, Switch, validators } from '@switch/react';
import styles from './${name}.module.css';

export default function ${name}Page() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className={styles.page}>
      <PageHeader
        title="Settings"
        subtitle="Manage your account settings"
      />

      <Tabs
        items={[
          {
            id: 'profile',
            label: 'Profile',
            content: (
              <Card padding="large">
                <h3 className={styles.sectionTitle}>Profile Information</h3>
                <Form onSubmit={(values) => console.log(values)}>
                  <Form.Field name="name" label="Full Name" rules={[validators.required()]} fullWidth />
                  <Form.Field name="email" label="Email" type="email" rules={[validators.required(), validators.email()]} fullWidth />
                  <Form.Field name="bio" label="Bio" placeholder="Tell us about yourself" fullWidth />
                  <Form.Submit>
                    <Button type="submit">Save Changes</Button>
                  </Form.Submit>
                </Form>
              </Card>
            ),
          },
          {
            id: 'notifications',
            label: 'Notifications',
            content: (
              <Card padding="large">
                <h3 className={styles.sectionTitle}>Notification Preferences</h3>
                <div className={styles.settingRow}>
                  <div>
                    <p className={styles.settingLabel}>Email Notifications</p>
                    <p className={styles.settingDesc}>Receive email updates about your account</p>
                  </div>
                  <Switch checked={notifications} onChange={setNotifications} />
                </div>
                <div className={styles.settingRow}>
                  <div>
                    <p className={styles.settingLabel}>Marketing Emails</p>
                    <p className={styles.settingDesc}>Receive emails about new features and offers</p>
                  </div>
                  <Switch checked={marketing} onChange={setMarketing} />
                </div>
              </Card>
            ),
          },
          {
            id: 'security',
            label: 'Security',
            content: (
              <Card padding="large">
                <h3 className={styles.sectionTitle}>Change Password</h3>
                <Form onSubmit={(values) => console.log(values)}>
                  <Form.Field name="currentPassword" label="Current Password" type="password" rules={[validators.required()]} fullWidth />
                  <Form.Field name="newPassword" label="New Password" type="password" rules={[validators.required(), validators.minLength(8)]} fullWidth />
                  <Form.Field name="confirmPassword" label="Confirm Password" type="password" rules={[validators.required(), validators.match('newPassword', 'Passwords must match')]} fullWidth />
                  <Form.Submit>
                    <Button type="submit">Update Password</Button>
                  </Form.Submit>
                </Form>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
`,
    [`${name}.module.css`]: `.page {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.sectionTitle {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 24px;
}

.settingRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--switch-color-neutral-200);
}

.settingRow:last-child {
  border-bottom: none;
}

.settingLabel {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px;
}

.settingDesc {
  font-size: 13px;
  color: var(--switch-color-text-secondary);
  margin: 0;
}
`,
  }),

  auth: (name: string, kebab: string) => ({
    [`${name}.tsx`]: `'use client';

import React, { useState } from 'react';
import { Card, Form, Button, validators, Divider } from '@switch/react';
import styles from './${name}.module.css';

export default function ${name}Page() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (values: Record<string, any>) => {
    console.log(isLogin ? 'Login:' : 'Register:', values);
  };

  return (
    <div className={styles.page}>
      <Card padding="large" className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>{isLogin ? 'Welcome back' : 'Create account'}</h1>
          <p className={styles.subtitle}>
            {isLogin ? 'Sign in to your account' : 'Get started with Switch'}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Field
              name="name"
              label="Full Name"
              placeholder="John Doe"
              rules={[validators.required()]}
              fullWidth
            />
          )}

          <Form.Field
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            rules={[validators.required(), validators.email()]}
            fullWidth
          />

          <Form.Field
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            rules={[validators.required(), validators.minLength(8)]}
            fullWidth
          />

          {!isLogin && (
            <Form.Field
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              rules={[validators.required(), validators.match('password', 'Passwords must match')]}
              fullWidth
            />
          )}

          <Form.Submit>
            <Button type="submit" fullWidth>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </Form.Submit>
        </Form>

        <Divider />

        <p className={styles.switchText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            className={styles.switchBtn}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </Card>
    </div>
  );
}
`,
    [`${name}.module.css`]: `.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--switch-color-neutral-100);
}

.authCard {
  width: 100%;
  max-width: 400px;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px;
}

.subtitle {
  font-size: 14px;
  color: var(--switch-color-text-secondary);
  margin: 0;
}

.switchText {
  text-align: center;
  font-size: 14px;
  color: var(--switch-color-text-secondary);
  margin: 0;
}

.switchBtn {
  background: none;
  border: none;
  color: var(--switch-color-activeblue-400);
  font-weight: 500;
  cursor: pointer;
  margin-left: 4px;
}

.switchBtn:hover {
  text-decoration: underline;
}
`,
  }),
};
