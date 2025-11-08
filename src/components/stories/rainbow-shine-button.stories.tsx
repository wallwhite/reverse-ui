import type { Meta, StoryObj } from '@storybook/react';
import { RainbowShineButton } from '../../index';

const meta = {
  title: 'Components/RainbowShineButton',
  component: RainbowShineButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
} satisfies Meta<typeof RainbowShineButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Rainbow Button',
  },
};

export const ShortText: Story = {
  args: {
    children: 'Click',
  },
};

export const LongText: Story = {
  args: {
    children: 'Experience the Rainbow Effect',
  },
};
