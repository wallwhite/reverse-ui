import type { Meta, StoryObj } from '@storybook/react';
import { TextCycler } from '../../index';

const meta = {
  title: 'Components/TextCycler',
  component: TextCycler,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    texts: {
      control: 'object',
      description: 'Array of texts to cycle through',
    },
    interval: {
      control: { type: 'range', min: 500, max: 5000, step: 100 },
      description: 'Interval between text changes (ms)',
    },
  },
} satisfies Meta<typeof TextCycler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    texts: ['Amazing', 'Fantastic', 'Incredible', 'Awesome'],
    interval: 2000,
  },
};

export const SlowCycle: Story = {
  args: {
    texts: ['First', 'Second', 'Third'],
    interval: 3000,
  },
};

export const FastCycle: Story = {
  args: {
    texts: ['Quick', 'Fast', 'Rapid', 'Swift'],
    interval: 1000,
  },
};

export const LongTexts: Story = {
  args: {
    texts: ['Welcome to our application', 'Experience the difference', 'Join thousands of users'],
    interval: 2500,
  },
};
