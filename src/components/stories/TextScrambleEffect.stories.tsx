import type { Meta, StoryObj } from '@storybook/react';
import { TextScrambleEffect } from '../../index';

const meta = {
  title: 'Components/TextScrambleEffect',
  component: TextScrambleEffect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to display with scramble effect',
    },
  },
} satisfies Meta<typeof TextScrambleEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Scramble Effect',
  },
};

export const ShortText: Story = {
  args: {
    text: 'Fast',
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a longer text with scramble effect',
  },
};
