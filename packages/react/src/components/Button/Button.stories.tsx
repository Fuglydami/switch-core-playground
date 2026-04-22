import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Buttons trigger actions and events. Use the appropriate variant and color scheme for the context.

## Quick Start
\`\`\`tsx
import { Button } from '@switch/react';

<Button variant="primary" onPress={() => console.log('clicked')}>
  Click me
</Button>
\`\`\`

## With Loading State
\`\`\`tsx
<Button isLoading={true}>
  Submitting...
</Button>
\`\`\`

## Button Group
\`\`\`tsx
<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Submit</Button>
</div>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outline', 'link'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    shape: {
      control: 'select',
      options: ['rectangular', 'pill', 'square', 'circle'],
      description: 'Shape of the button',
    },
    colorScheme: {
      control: 'select',
      options: ['popBlue', 'activeBlue', 'primaryBlue', 'monochrome'],
      description: 'Color scheme of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Button takes full width of container',
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Pill: Story = {
  args: {
    shape: 'pill',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Submitting...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};

export const IconSquare: Story = {
  args: {
    shape: 'square',
    children: '→',
  },
};

export const IconCircle: Story = {
  args: {
    shape: 'circle',
    children: '→',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="link">Link</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button shape="rectangular">Rectangular</Button>
        <Button shape="pill">Pill</Button>
        <Button shape="square">→</Button>
        <Button shape="circle">→</Button>
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button colorScheme="popBlue" variant="primary">PopBlue</Button>
        <Button colorScheme="popBlue" variant="outline">Outline</Button>
        <Button colorScheme="popBlue" variant="link">Link</Button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button colorScheme="activeBlue" variant="primary">ActiveBlue</Button>
        <Button colorScheme="activeBlue" variant="outline">Outline</Button>
        <Button colorScheme="activeBlue" variant="link">Link</Button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button colorScheme="primaryBlue" variant="primary">PrimaryBlue</Button>
        <Button colorScheme="primaryBlue" variant="outline">Outline</Button>
        <Button colorScheme="primaryBlue" variant="link">Link</Button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button colorScheme="monochrome" variant="primary">Monochrome</Button>
        <Button colorScheme="monochrome" variant="outline">Outline</Button>
        <Button colorScheme="monochrome" variant="link">Link</Button>
      </div>
    </div>
  ),
};
