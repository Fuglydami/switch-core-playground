import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: 'item-1', label: 'Item 1', onClick: () => {} },
  { id: 'item-2', label: 'Item 2', onClick: () => {} },
  {
    id: 'item-3', label: 'Item 3',
    children: [
      { id: 'sub-1', label: 'Item 1', onClick: () => {} },
      { id: 'sub-2', label: 'Item 2', onClick: () => {} },
      { id: 'sub-3', label: 'Item 3', onClick: () => {} },
    ],
  },
  { id: 'item-4', label: 'Item 4', onClick: () => {} },
];

export const Default: Story = {
  args: {
    items,
    trigger: (
      <button type="button" style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>
        Open Menu ▾
      </button>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'edit', label: 'Edit', onClick: () => {},
        icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      },
      {
        id: 'duplicate', label: 'Duplicate', shortcut: '⌘D', onClick: () => {},
        icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.25" /><path d="M2 10V3a1 1 0 011-1h7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" /></svg>,
      },
      { id: 'separator', label: '' },
      {
        id: 'delete', label: 'Delete', danger: true, onClick: () => {},
        icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5.5 3.5V2h3v1.5M5 5.5v5M9 5.5v5M3 3.5l.5 8.5h7L11 3.5H3z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      },
    ],
    trigger: (
      <button type="button" style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>
        Actions ▾
      </button>
    ),
  },
};
