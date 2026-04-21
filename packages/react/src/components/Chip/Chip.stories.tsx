import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Portland' },
};

export const Removable: Story = {
  args: {
    label: 'Portland',
    onRemove: () => console.log('removed'),
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Portland',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5C4.515 1.5 2.5 3.515 2.5 6c0 3.5 4.5 7 4.5 7S11.5 9.5 11.5 6C11.5 3.515 9.485 1.5 7 1.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />
      </svg>
    ),
    count: 8,
    onRemove: () => {},
  },
};

export const Selectable: Story = {
  args: {
    label: 'Biking',
    selected: false,
    onSelect: () => {},
  },
};

export const Selected: Story = {
  args: {
    label: 'Biking',
    selected: true,
    onSelect: () => {},
    count: 8,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Chip label="Small" size="small" />
      <Chip label="Medium" size="medium" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    onRemove: () => {},
  },
};
