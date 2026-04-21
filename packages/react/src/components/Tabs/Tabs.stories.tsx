import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
  { id: 'billing', label: 'Billing', disabled: true },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('overview');
    return <Tabs items={ITEMS} activeId={active} onChange={setActive} variant="underline" />;
  },
};

export const Pill: Story = {
  render: () => {
    const [active, setActive] = useState('overview');
    return <Tabs items={ITEMS} activeId={active} onChange={setActive} variant="pill" />;
  },
};

export const WithBadge: Story = {
  render: () => {
    const [active, setActive] = useState('inbox');
    const items = [
      { id: 'inbox', label: 'Inbox', badge: 12 },
      { id: 'sent', label: 'Sent' },
      { id: 'drafts', label: 'Drafts', badge: 3 },
    ];
    return <Tabs items={items} activeId={active} onChange={setActive} variant="underline" />;
  },
};
