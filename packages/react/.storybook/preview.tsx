import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: 'padded',
    docs: {
      toc: true,
      source: {
        language: 'tsx',
        type: 'code',
      },
    },
  },
  decorators: [
    (Story) => {
      document.documentElement.setAttribute('data-theme', 'light');

      return (
        <div
          data-theme="light"
          style={{
            padding: '2rem',
            background: '#ffffff',
            minHeight: '100px',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
