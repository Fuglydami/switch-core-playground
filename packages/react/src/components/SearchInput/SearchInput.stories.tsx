import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Composite/SearchInput',
  component: SearchInput,
  parameters: {
    docs: {
      description: {
        component: `
A search input with built-in debouncing, loading state, and clear button.

## Quick Start
\`\`\`tsx
import { SearchInput } from '@switch/react';

<SearchInput
  placeholder="Search users..."
  onSearch={(query) => console.log('Search:', query)}
/>
\`\`\`

## With Loading State
\`\`\`tsx
const [isLoading, setIsLoading] = useState(false);

<SearchInput
  placeholder="Search..."
  isLoading={isLoading}
  onSearch={async (query) => {
    setIsLoading(true);
    await fetchResults(query);
    setIsLoading(false);
  }}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Input size',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithCallback: Story = {
  render: () => {
    const [results, setResults] = useState<string>('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SearchInput
          placeholder="Type to search..."
          onSearch={(value) => setResults(`Searching for: "${value}"`)}
        />
        <p style={{ color: '#6b7280', fontSize: 14 }}>{results || 'Start typing...'}</p>
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'Search...',
    isLoading: true,
    value: 'searching...',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Search...',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Search...',
    size: 'large',
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Search across all records...',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search disabled',
    disabled: true,
  },
};

export const CustomDebounce: Story = {
  args: {
    placeholder: 'Debounce 1000ms...',
    debounceMs: 1000,
  },
};
