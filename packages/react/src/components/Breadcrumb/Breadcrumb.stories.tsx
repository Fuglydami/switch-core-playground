import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'electronics', label: 'Electronics' },
];

const longPath = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'category', label: 'Category', href: '/category' },
  { id: 'subcategory', label: 'Subcategory', href: '/category/sub' },
  { id: 'product-type', label: 'Product Type', href: '/category/sub/type' },
  { id: 'product', label: 'Product Details' },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'current', label: 'Current Page' },
    ],
  },
};

export const LongPath: Story = {
  args: {
    items: longPath,
  },
};

export const Collapsed: Story = {
  args: {
    items: longPath,
    maxItems: 3,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: <span style={{ margin: '0 4px' }}>/</span>,
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', onClick: () => alert('Navigate to Home') },
      { id: 'products', label: 'Products', onClick: () => alert('Navigate to Products') },
      { id: 'current', label: 'Current Page' },
    ],
    onNavigate: (item) => console.log('Navigated to:', item.id),
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ id: 'home', label: 'Home' }],
  },
};
