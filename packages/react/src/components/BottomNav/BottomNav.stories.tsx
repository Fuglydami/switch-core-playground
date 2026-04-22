import type { Meta, StoryObj } from '@storybook/react';
import { BottomNav } from './BottomNav';

const meta: Meta<typeof BottomNav> = {
  title: 'Components/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: { control: 'select', options: ['outline', 'fill', 'outline-fill'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ height: '300px', background: '#f5f5f5', padding: '16px' }}>
          <p style={{ color: '#666' }}>Page content...</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HomeIconFilled = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);

const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="7" r="4" />
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navItems = [
  { id: 'home', label: 'Home', icon: <HomeIcon />, activeIcon: <HomeIconFilled /> },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'messages', label: 'Messages', icon: <MessageIcon />, badge: 5 },
  { id: 'profile', label: 'Profile', icon: <UserIcon /> },
];

export const Default: Story = {
  args: {
    items: navItems,
    activeId: 'home',
    variant: 'outline-fill',
  },
};

export const OutlineVariant: Story = {
  args: {
    items: navItems,
    activeId: 'home',
    variant: 'outline',
  },
};

export const FillVariant: Story = {
  args: {
    items: navItems,
    activeId: 'messages',
    variant: 'fill',
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, activeIcon: <HomeIconFilled /> },
      { id: 'search', label: 'Search', icon: <SearchIcon /> },
      { id: 'messages', label: 'Messages', icon: <MessageIcon />, badge: 12 },
      { id: 'notifications', label: 'Alerts', icon: <UserIcon />, badge: '99+' },
    ],
    activeId: 'home',
    variant: 'outline-fill',
  },
};

export const ThreeItems: Story = {
  args: {
    items: navItems.slice(0, 3),
    activeId: 'search',
    variant: 'outline-fill',
  },
};

export const FiveItems: Story = {
  args: {
    items: [
      ...navItems,
      { id: 'settings', label: 'Settings', icon: <SearchIcon /> },
    ],
    activeId: 'home',
    variant: 'outline-fill',
  },
};
