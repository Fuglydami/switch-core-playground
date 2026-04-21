import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No transactions yet',
    description: 'Your transaction history will appear here once you make your first payment.',
    action: (
      <button type="button" style={{ padding: '10px 24px', background: 'var(--switch-color-semantic-interactive)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
        Make a payment
      </button>
    ),
    secondaryAction: (
      <button type="button" style={{ padding: '10px 24px', background: 'transparent', color: 'var(--switch-color-semantic-interactive)', border: '1px solid var(--switch-color-semantic-interactive)', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
        Learn more
      </button>
    ),
  },
};

export const CustomIllustration: Story = {
  args: {
    title: 'No files uploaded',
    description: 'Drag and drop files here or click the button below to upload.',
    illustration: (
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="48" r="40" fill="var(--switch-color-activeblue-100)" />
        <path d="M32 56L48 40l16 16" stroke="var(--switch-color-semantic-interactive)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M48 40v24" stroke="var(--switch-color-semantic-interactive)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    action: (
      <button type="button" style={{ padding: '10px 24px', background: 'var(--switch-color-semantic-interactive)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
        Upload file
      </button>
    ),
  },
};
