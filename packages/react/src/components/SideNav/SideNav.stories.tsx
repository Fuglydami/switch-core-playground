import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from './SideNav';

const meta: Meta<typeof SideNav> = {
  title: 'Components/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['full', 'compact'] },
    theme:   { control: 'select', options: ['light', 'dark'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 7.5L9 2l7 5.5V15a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navItems = [
  { id: 'home',      label: 'Home',      icon: <HomeIcon />, href: '#' },
  { id: 'reports',   label: 'Reports',   icon: <HomeIcon />, href: '#' },
  { id: 'settings',  label: 'Settings',  icon: <HomeIcon />, href: '#',
    children: [
      { id: 'account',  label: 'Account',  href: '#' },
      { id: 'security', label: 'Security', href: '#' },
    ],
  },
  { id: 'users',     label: 'Users',     icon: <HomeIcon />, badge: 3, href: '#' },
  { id: 'billing',   label: 'Billing',   icon: <HomeIcon />, href: '#' },
  { id: 'support',   label: 'Support',   icon: <HomeIcon />, href: '#' },
  { id: 'faq',       label: 'FAQ',       icon: <HomeIcon />, href: '#' },
  { id: 'disabled',  label: 'Disabled',  icon: <HomeIcon />, disabled: true },
];

const logo = (
  <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--switch-color-semantic-primary)' }}>
    PayDirect ⚡
  </span>
);

export const Light: Story = {
  args: { items: navItems, activeId: 'home', logo, variant: 'full', theme: 'light' },
  decorators: [(S) => <div style={{ height: '100vh', display: 'flex' }}><S /></div>],
};

export const Dark: Story = {
  args: { items: navItems, activeId: 'home', logo, variant: 'full', theme: 'dark' },
  decorators: [(S) => <div style={{ height: '100vh', display: 'flex' }}><S /></div>],
};

export const Compact: Story = {
  args: { items: navItems, activeId: 'reports', variant: 'compact', theme: 'light' },
  decorators: [(S) => <div style={{ height: '100vh', display: 'flex' }}><S /></div>],
};
