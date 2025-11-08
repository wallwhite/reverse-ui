import type { Meta, StoryObj } from '@storybook/react';
import { LogoDotsShader } from '../../index';

const meta = {
  title: 'Components/LogoDotsShader',
  component: LogoDotsShader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 200, max: 800, step: 50 },
      description: 'Canvas width',
    },
    height: {
      control: { type: 'range', min: 200, max: 800, step: 50 },
      description: 'Canvas height',
    },
  },
} satisfies Meta<typeof LogoDotsShader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 500,
    height: 500,
  },
};

export const Wide: Story = {
  args: {
    width: 600,
    height: 400,
  },
};

export const Square: Story = {
  args: {
    width: 400,
    height: 400,
  },
};
