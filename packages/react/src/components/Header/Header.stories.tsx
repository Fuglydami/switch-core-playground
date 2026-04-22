import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: { control: 'select', options: ['light', 'dark'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#0275d8" />
    <path d="M10 16h12M16 10v12" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products', hasDropdown: true },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const userMenuItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'logout', label: 'Logout' },
];

export const Default: Story = {
  args: {
    logo: <Logo />,
    navItems,
    activeNavId: 'home',
    user: {
      name: 'John Doe',
      designation: 'Admin',
    },
    userMenuItems,
    onNotificationClick: () => alert('Notifications'),
    notificationCount: 5,
  },
};

export const WithAvatar: Story = {
  args: {
    logo: <Logo />,
    navItems,
    activeNavId: 'products',
    user: {
      name: 'Jane Smith',
      designation: 'Developer',
      avatar: 'https://i.pravatar.cc/80?img=5',
    },
    userMenuItems,
    onNotificationClick: () => alert('Notifications'),
    notificationCount: 12,
  },
};

export const DarkVariant: Story = {
  args: {
    logo: <Logo />,
    navItems,
    activeNavId: 'home',
    variant: 'dark',
    user: {
      name: 'John Doe',
      designation: 'Admin',
    },
    userMenuItems,
    onNotificationClick: () => alert('Notifications'),
    notificationCount: 3,
  },
};

export const MinimalNoNav: Story = {
  args: {
    logo: <Logo />,
    user: {
      name: 'John Doe',
    },
    userMenuItems,
  },
};

export const NoNotifications: Story = {
  args: {
    logo: <Logo />,
    navItems: navItems.slice(0, 2),
    activeNavId: 'home',
    user: {
      name: 'John Doe',
      designation: 'User',
    },
    userMenuItems,
  },
};
