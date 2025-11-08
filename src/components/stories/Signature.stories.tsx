import type { Meta, StoryObj } from '@storybook/react';
import { Signature } from '../../index';

const meta = {
  title: 'Components/Signature',
  component: Signature,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to render as signature',
    },
    color: {
      control: 'color',
      description: 'Color of the signature',
    },
  },
} satisfies Meta<typeof Signature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'John Doe',
    color: '#000',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#ffffff', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};

export const DarkMode: Story = {
  args: {
    text: 'Jane Smith',
    color: '#ffffff',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Colored: Story = {
  args: {
    text: 'Signature',
    color: '#6366f1',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#ffffff', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};
