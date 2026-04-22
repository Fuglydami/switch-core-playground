import type { Meta, StoryObj } from '@storybook/react';
import { AppBar, AppBarAction } from './AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['default', 'large'] },
    variant: { control: 'select', options: ['light', 'dark'] },
    titleAlign: { control: 'select', options: ['left', 'center'] },
    showBack: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', background: '#f5f5f5' }}>
        <Story />
        <div style={{ padding: '16px', color: '#666', fontSize: '14px' }}>
          Page content goes here...
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3a6 6 0 00-6 6v4l-2 3h16l-2-3V9a6 6 0 00-6-6zM10.5 21a1.5 1.5 0 003 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Settings',
    showBack: true,
    onBack: () => alert('Go back'),
  },
};

export const WithTrailingActions: Story = {
  args: {
    title: 'Messages',
    showBack: true,
    onBack: () => alert('Go back'),
    trailing: (
      <>
        <AppBarAction icon={<SearchIcon />} label="Search" onClick={() => alert('Search')} />
        <AppBarAction icon={<MoreIcon />} label="More" onClick={() => alert('More')} />
      </>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Notifications',
    showBack: true,
    onBack: () => alert('Go back'),
    trailing: (
      <AppBarAction icon={<BellIcon />} label="Notifications" badge={5} onClick={() => alert('Notifications')} />
    ),
  },
};

export const LargeWithLabel: Story = {
  args: {
    size: 'large',
    label: 'Welcome back',
    title: 'Dashboard',
    subtitle: 'Last updated 5 min ago',
    titleAlign: 'left',
    trailing: (
      <AppBarAction icon={<BellIcon />} label="Notifications" badge={3} onClick={() => alert('Notifications')} />
    ),
  },
};

export const CenterAligned: Story = {
  args: {
    title: 'Profile',
    showBack: true,
    onBack: () => {},
    titleAlign: 'center',
    trailing: <AppBarAction icon={<MoreIcon />} label="Options" />,
  },
};

export const LeftAligned: Story = {
  args: {
    title: 'Activity',
    showBack: true,
    onBack: () => {},
    titleAlign: 'left',
    trailing: <AppBarAction icon={<SearchIcon />} label="Search" />,
  },
};

export const DarkVariant: Story = {
  args: {
    title: 'Dark AppBar',
    showBack: true,
    onBack: () => alert('Go back'),
    variant: 'dark',
    trailing: (
      <>
        <AppBarAction icon={<SearchIcon />} label="Search" />
        <AppBarAction icon={<MoreIcon />} label="More" />
      </>
    ),
  },
};

export const LargeDark: Story = {
  args: {
    size: 'large',
    title: 'Transactions',
    subtitle: '124 items',
    titleAlign: 'left',
    variant: 'dark',
    showBack: true,
    onBack: () => {},
    trailing: <AppBarAction icon={<BellIcon />} label="Alerts" badge={12} />,
  },
};

export const MinimalNoBack: Story = {
  args: {
    title: 'Home',
    titleAlign: 'center',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AppBar title="Default Size" showBack onBack={() => {}} size="default" />
      <AppBar title="Large Size" subtitle="With subtitle" showBack onBack={() => {}} size="large" titleAlign="left" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AppBar title="Light Variant" showBack onBack={() => {}} variant="light" />
      <AppBar title="Dark Variant" showBack onBack={() => {}} variant="dark" />
    </div>
  ),
};
