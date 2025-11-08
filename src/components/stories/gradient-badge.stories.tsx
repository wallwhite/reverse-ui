import type { Meta, StoryObj } from '@storybook/react';
import { GradientBadge } from '../../index';

const meta = {
  title: 'Components/GradientBadge',
  component: GradientBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
} satisfies Meta<typeof GradientBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'New',
  },
};

export const Featured: Story = {
  args: {
    children: 'Featured',
  },
};

export const Sale: Story = {
  args: {
    children: 'Sale 50% Off',
  },
};

export const LongText: Story = {
  args: {
    children: 'Limited Time Offer',
  },
};
