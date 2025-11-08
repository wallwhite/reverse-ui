import type { Meta, StoryObj } from '@storybook/react';
import { ShinyButton } from '../../index';

const meta = {
  title: 'Components/ShinyButton',
  component: ShinyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ShinyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Shiny Button',
  },
};

export const LongText: Story = {
  args: {
    children: 'Click Me to See the Shine Effect',
  },
};

export const ShortText: Story = {
  args: {
    children: 'Go',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled',
    className: 'my-custom-class',
  },
};
