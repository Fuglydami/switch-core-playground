import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = { args: {} };

export const WithLabel: Story = {
  args: { label: 'Today' },
};

export const WithTextLabel: Story = {
  name: 'Notifications divider',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Divider label="Notifications" />
      <Divider label="Today" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 40, gap: 12 }}>
      <span>Content</span>
      <Divider orientation="vertical" />
      <span>Content</span>
      <Divider orientation="vertical" />
      <span>Content</span>
    </div>
  ),
};
