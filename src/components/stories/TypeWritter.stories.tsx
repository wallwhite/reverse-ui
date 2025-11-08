import type { Meta, StoryObj } from '@storybook/react';
import { Typewriter } from '../../index';

const meta = {
  title: 'Components/Typewriter',
  component: Typewriter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to type out',
    },
    speed: {
      control: { type: 'range', min: 10, max: 200, step: 10 },
      description: 'Typing speed (ms per character)',
    },
    delay: {
      control: { type: 'range', min: 0, max: 2000, step: 100 },
      description: 'Initial delay before typing starts (ms)',
    },
  },
} satisfies Meta<typeof Typewriter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello, World! This is a typewriter effect.',
    speed: 30,
    delay: 0,
  },
};

export const FastTyping: Story = {
  args: {
    text: 'Fast typing speed demonstration',
    speed: 15,
    delay: 0,
  },
};

export const SlowTyping: Story = {
  args: {
    text: 'Slow and steady typing...',
    speed: 100,
    delay: 0,
  },
};

export const WithDelay: Story = {
  args: {
    text: 'This text appears after a 1 second delay',
    speed: 30,
    delay: 1000,
  },
};
