import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px' }}>Card Title</h3>
        <p style={{ margin: 0, color: '#5F738C' }}>Card content goes here.</p>
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div>
        <div style={{ background: '#E1E6ED', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F738C' }}>
          Image placeholder
        </div>
        <div style={{ padding: 16 }}>
          <h3 style={{ margin: '0 0 8px' }}>Card Title</h3>
          <p style={{ margin: 0, color: '#5F738C' }}>Content with custom padding.</p>
        </div>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    onPress: () => console.log('Card clicked!'),
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px' }}>Clickable Card</h3>
        <p style={{ margin: 0, color: '#5F738C' }}>Click me!</p>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Card variant="elevated" style={{ width: 200 }}>
        <h4 style={{ margin: 0 }}>Elevated</h4>
      </Card>
      <Card variant="outlined" style={{ width: 200 }}>
        <h4 style={{ margin: 0 }}>Outlined</h4>
      </Card>
      <Card variant="filled" style={{ width: 200 }}>
        <h4 style={{ margin: 0 }}>Filled</h4>
      </Card>
    </div>
  ),
};
