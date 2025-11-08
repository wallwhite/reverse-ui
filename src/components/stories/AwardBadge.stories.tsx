import type { Meta, StoryObj } from '@storybook/react';
import { AwardBadge } from '../../index';

const meta = {
  title: 'Components/AwardBadge',
  component: AwardBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge content',
    },
    color: {
      control: 'color',
      description: 'Badge accent color',
    },
  },
} satisfies Meta<typeof AwardBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Award',
  },
};

export const WithCustomColor: Story = {
  args: {
    children: 'Winner',
    color: '#ff6b6b',
  },
};

export const BlueAward: Story = {
  args: {
    children: 'Best Performance',
    color: '#4dabf7',
  },
};

export const GreenAward: Story = {
  args: {
    children: 'Verified',
    color: '#51cf66',
  },
};
