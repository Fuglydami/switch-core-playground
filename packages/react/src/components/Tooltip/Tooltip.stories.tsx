import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: { content: 'This is a tooltip', placement: 'top' },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <Tooltip {...args}>
        <Button variant="secondary" colorScheme="monochrome">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', padding: '80px' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip key={placement} content={`Tooltip ${placement}`} placement={placement}>
          <Button variant="secondary" colorScheme="monochrome">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithHelperText: Story = {
  args: { content: 'Archive item', helperText: 'This action is reversible', placement: 'top' },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <Tooltip {...args}>
        <Button variant="secondary" colorScheme="monochrome">Archive</Button>
      </Tooltip>
    </div>
  ),
};
