import type { Meta, StoryObj } from '@storybook/react';
import { ShinyText } from '../../index';

const meta = {
  title: 'Components/ShinyText',
  component: ShinyText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content',
    },
    duration: {
      control: { type: 'range', min: 0.5, max: 5, step: 0.5 },
      description: 'Animation duration',
    },
    delay: {
      control: { type: 'range', min: 0, max: 3, step: 0.5 },
      description: 'Delay before repeat',
    },
  },
} satisfies Meta<typeof ShinyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Shiny Text Effect',
    duration: 2,
    delay: 0,
  },
};

export const ShortText: Story = {
  args: {
    text: 'Shine',
    duration: 2,
    delay: 0,
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a long piece of text with a shiny animation effect',
    duration: 3,
    delay: 1,
  },
};
