import type { Preview } from '@storybook/react';
import React from 'react';
import '@fontsource/inter';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#161616'
        },
        {
          name: 'light',
          value: '#ffffff'
        }
      ]
    }
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
