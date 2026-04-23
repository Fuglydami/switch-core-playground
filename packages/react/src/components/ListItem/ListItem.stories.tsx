import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Label: Story = {
  args: { variant: 'label', label: 'Inbox', sublabel: '12 new messages' },
};

export const WithAvatar: Story = {
  args: {
    variant: 'label-avatar',
    label: 'Damilare Oyedeji',
    sublabel: 'damilare@switch.ng',
    avatar: { initials: 'DO' },
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'label-icon',
    label: 'Settings',
    leadingIcon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

export const WithControl: Story = {
  args: {
    variant: 'label-control',
    label: 'Email notifications',
    sublabel: 'Receive alerts by email',
    control: (
      <input type="checkbox" defaultChecked aria-label="Toggle email notifications" />
    ),
  },
};

export const Clickable: Story = {
  args: {
    variant: 'label',
    label: 'Click me',
    sublabel: 'I am interactive',
    onClick: () => console.log('Clicked!'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ border: '1px solid #eaecef', borderRadius: 8, overflow: 'hidden', maxWidth: 400 }}>
      <ListItem variant="label" label="Label only" />
      <ListItem variant="label-avatar" label="Avatar item" sublabel="With subtitle" avatar={{ initials: 'AB' }} />
      <ListItem variant="label-icon" label="Icon item" leadingIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/></svg>} />
      <ListItem variant="label-control" label="Control item" control={<input type="checkbox" />} />
    </div>
  ),
};
