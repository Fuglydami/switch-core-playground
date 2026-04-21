import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'busy'] },
    editable: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: { initials: 'AA', size: 'medium' },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/160?img=47',
    alt: 'Profile photo',
    size: 'medium',
  },
};

export const Placeholder: Story = {
  args: { size: 'medium' },
};

export const Online: Story = {
  args: { initials: 'OA', size: 'medium', status: 'online' },
};

export const Offline: Story = {
  args: { initials: 'OA', size: 'medium', status: 'offline' },
};

export const Busy: Story = {
  args: { initials: 'OA', size: 'medium', status: 'busy' },
};

export const Editable: Story = {
  args: { initials: 'OA', size: 'large', editable: true },
};

export const Bordered: Story = {
  args: { initials: 'AA', size: 'medium', bordered: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar initials="AA" size="small" />
      <Avatar initials="AA" size="medium" />
      <Avatar initials="AA" size="large" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar initials="ON" size="medium" status="online" />
      <Avatar initials="OF" size="medium" status="offline" />
      <Avatar initials="BY" size="medium" status="busy" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      size="small"
      avatars={[
        { initials: 'AA' },
        { initials: 'OA' },
        { initials: 'BD' },
        { initials: 'CE' },
        { initials: 'DF' },
        { initials: 'EG' },
      ]}
      max={4}
    />
  ),
};
