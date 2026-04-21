import type { Meta, StoryObj } from '@storybook/react';
import { RingLoader, ProgressBar, StepProgress } from './Loader';

const meta: Meta<typeof RingLoader> = {
  title: 'Components/Loader',
  component: RingLoader,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    progress: { control: { type: 'range', min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Ring: Story = {
  args: { size: 'medium' },
};

export const RingProgress: Story = {
  name: 'Ring — 50%',
  args: { size: 'medium', progress: 50 },
};

export const RingComplete: Story = {
  name: 'Ring — Complete',
  args: { size: 'medium', progress: 100 },
};

export const RingSizes: Story = {
  name: 'Ring — All sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <RingLoader size="small" />
      <RingLoader size="medium" />
      <RingLoader size="large" />
      <RingLoader size="large" progress={100} />
    </div>
  ),
};

export const ProgressBarDefault: Story = {
  name: 'Progress Bar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <ProgressBar value={0} size="medium" />
      <ProgressBar value={50} size="medium" />
      <ProgressBar value={100} size="medium" />
    </div>
  ),
};

export const ProgressBarLabelled: Story = {
  name: 'Progress Bar + Labels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <ProgressBar value={30} label="Password strength" trailingLabel="Weak" size="medium" />
      <ProgressBar value={65} label="Upload" showPercent size="thick" />
    </div>
  ),
};

export const StepsHorizontal: Story = {
  name: 'Step Progress — Horizontal',
  render: () => (
    <StepProgress
      activeIndex={1}
      steps={[
        { id: '1', label: 'Header Field', description: 'Name and email' },
        { id: '2', label: 'Company details', description: 'Website and location' },
        { id: '3', label: 'Invite your team', description: 'Start collaborating' },
        { id: '4', label: 'Add your socials', description: 'Automatic sharing' },
      ]}
    />
  ),
};

export const StepsVertical: Story = {
  name: 'Step Progress — Vertical',
  render: () => (
    <StepProgress
      orientation="vertical"
      activeIndex={2}
      steps={[
        { id: '1', label: 'Header Field', description: 'This is a description field' },
        { id: '2', label: 'Company details', description: 'A few details about your company' },
        { id: '3', label: 'Invite your team', description: 'Start collaborating with your team' },
        { id: '4', label: 'Add your socials', description: 'Share posts to your social accounts' },
      ]}
    />
  ),
};
