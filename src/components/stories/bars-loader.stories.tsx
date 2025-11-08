import type { Meta, StoryObj } from '@storybook/react';
import { BarsLoader } from '../../index';

const meta = {
  title: 'Components/BarsLoader',
  component: BarsLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 20, max: 100, step: 5 },
      description: 'Size of the loader',
    },
    color: {
      control: 'color',
      description: 'Color of the bars',
    },
  },
} satisfies Meta<typeof BarsLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 40,
    color: '#3b82f6',
  },
};

export const Small: Story = {
  args: {
    size: 30,
    color: '#3b82f6',
  },
};

export const Large: Story = {
  args: {
    size: 60,
    color: '#3b82f6',
  },
};

export const RedLoader: Story = {
  args: {
    size: 40,
    color: '#ef4444',
  },
};

export const GreenLoader: Story = {
  args: {
    size: 40,
    color: '#10b981',
  },
};
