import type { Meta, StoryObj } from '@storybook/react';
import { AIChat } from '../../index';

const meta = {
  title: 'Components/AIChat',
  component: AIChat,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Product name',
    },
    description: {
      control: 'text',
      description: 'Product description',
    },
  },
} satisfies Meta<typeof AIChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Acme UI',
    description: 'Acme UI is a comprehensive component library built with React and TypeScript. It provides beautiful, accessible components that help you build modern web applications faster.',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ProductDemo: Story = {
  args: {
    name: 'Reverse',
    description: 'Reverse is a collection of beautifully designed, animated React components. Perfect for building stunning landing pages and interactive interfaces.',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};
