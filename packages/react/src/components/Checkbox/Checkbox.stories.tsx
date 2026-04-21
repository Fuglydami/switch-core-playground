import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Radio, Toggle } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Controls/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Accept terms', size: 20 } };
export const Checked: Story = { args: { label: 'Accept terms', checked: true, onChange: () => {}, size: 20 } };
export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true, size: 20 } };
export const Circle: Story = { args: { label: 'Circle variant', variant: 'circle', checked: true, onChange: () => {}, size: 20 } };
export const Disabled: Story = { args: { label: 'Disabled', disabled: true, size: 20 } };
export const DisabledChecked: Story = { args: { label: 'Disabled checked', disabled: true, checked: true, onChange: () => {}, size: 20 } };

export const RadioDefault: Story = {
  name: 'Radio — Default',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio label="Yes" name="demo" value="yes" defaultChecked />
      <Radio label="No"  name="demo" value="no" />
    </div>
  ),
};

export const ToggleDefault: Story = {
  name: 'Toggle — Default',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toggle label="Notifications" size="medium" defaultChecked />
      <Toggle label="Dark mode"     size="medium" />
      <Toggle label="Small"         size="small"  defaultChecked />
      <Toggle label="Large"         size="large"  defaultChecked />
    </div>
  ),
};
