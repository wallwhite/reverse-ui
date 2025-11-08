import type { Meta, StoryObj } from '@storybook/react';
import { CoolBadge } from '../../index';

const meta = {
  title: 'Components/CoolBadge',
  component: CoolBadge,
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
} satisfies Meta<typeof CoolBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Cool',
  },
};

export const Pro: Story = {
  args: {
    children: 'PRO',
  },
};

export const Premium: Story = {
  args: {
    children: 'Premium',
  },
};
