import type { Meta, StoryObj } from '@storybook/react';
import { Slider, RangeSlider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'large'] },
    disabled: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: 40 } };

export const WithLabels: Story = {
  args: { defaultValue: 60, showLabels: true, min: 0, max: 100 },
};

export const Formatted: Story = {
  name: 'Formatted labels',
  args: {
    defaultValue: 3000000,
    min: 300000,
    max: 5000000,
    step: 100000,
    showLabels: true,
    formatLabel: (v) => `₦${(v / 1000000).toFixed(1)}M`,
  },
};

export const Disabled: Story = { args: { defaultValue: 30, disabled: true } };

export const Range: Story = {
  name: 'Range slider',
  render: () => (
    <RangeSlider
      defaultValue={[300000, 3000000]}
      min={300000}
      max={5000000}
      step={100000}
      showLabels
      formatLabel={(v) => `₦${(v / 1000000).toFixed(1)}M`}
    />
  ),
};
