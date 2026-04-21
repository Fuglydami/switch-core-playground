import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastContainer } from './Toast';
import { useToast } from '../../hooks/useToast';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['info', 'success', 'warning', 'error', 'informatory'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { type: 'info', title: 'New update available', description: 'Version 2.0 is ready.' },
};

export const Success: Story = {
  args: { type: 'success', title: 'Changes saved', description: 'Your profile was updated.' },
};

export const Warning: Story = {
  args: { type: 'warning', title: 'Almost at limit', description: 'You have used 90% of your quota.' },
};

export const Error: Story = {
  args: { type: 'error', title: 'Something went wrong', description: 'Please try again later.' },
};

export const Informatory: Story = {
  args: { type: 'informatory', title: 'Did you know?', description: 'You can customize your dashboard.' },
};

export const WithAction: Story = {
  args: {
    type: 'info',
    title: 'New version available',
    description: 'Version 2.0 is ready to install.',
    action: { label: 'Update now', onClick: () => console.log('Update clicked') },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <Toast type="info" title="Info toast" onDismiss={() => {}} />
      <Toast type="success" title="Success toast" onDismiss={() => {}} />
      <Toast type="warning" title="Warning toast" onDismiss={() => {}} />
      <Toast type="error" title="Error toast" onDismiss={() => {}} />
      <Toast type="informatory" title="Informatory toast" onDismiss={() => {}} />
    </div>
  ),
};

export const WithHook: Story = {
  render: () => {
    const { toasts, toast } = useToast();
    return (
      <>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary" colorScheme="activeBlue" onPress={() => toast({ type: 'info', title: 'Info notification' })}>Info</Button>
          <Button variant="primary" colorScheme="monochrome" onPress={() => toast({ type: 'success', title: 'Action succeeded!' })}>Success</Button>
          <Button variant="secondary" colorScheme="monochrome" onPress={() => toast({ type: 'warning', title: 'Watch out!' })}>Warning</Button>
          <Button variant="secondary" colorScheme="activeBlue" onPress={() => toast({ type: 'error', title: 'Something went wrong' })}>Error</Button>
        </div>
        <ToastContainer toasts={toasts} />
      </>
    );
  },
};
