import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'item-1',
    label: 'What is Switch Core?',
    content: 'Switch Core is a design system that provides a consistent set of components, tokens, and guidelines for building products across the Switch ecosystem.',
  },
  {
    id: 'item-2',
    label: 'How do I install it?',
    content: 'Run `pnpm add @switch/react` in your project. Then import the tokens CSS file and use the components.',
  },
  {
    id: 'item-3',
    label: 'Is dark mode supported?',
    content: 'Yes — add `data-theme="dark"` to your root element to activate dark mode. All semantic tokens automatically switch.',
  },
  {
    id: 'item-4',
    label: 'Disabled item',
    content: 'This item is disabled and cannot be expanded.',
    disabled: true,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    defaultOpen: ['item-1'],
  },
};

export const Multiple: Story = {
  args: {
    items: sampleItems,
    multiple: true,
    defaultOpen: ['item-1', 'item-2'],
  },
};

export const AllClosed: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      ),
    })),
    defaultOpen: ['item-1'],
  },
};
