import type { Meta, StoryObj } from '@storybook/react';
import { DotsShader } from '../../index';

const meta = {
  title: 'Components/DotsShader',
  component: DotsShader,
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
    introAnimation: {
      control: { type: 'select' },
      options: ['wave', 'fade', 'static'],
      description: 'Intro animation type',
    },
    animationRepeat: {
      control: { type: 'select' },
      options: ['once', 'infinite'],
      description: 'Animation repeat mode',
    },
    animationDuration: {
      control: { type: 'range', min: 0.5, max: 5, step: 0.5 },
      description: 'Animation duration in seconds',
    },
  },
} satisfies Meta<typeof DotsShader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 500,
    height: 500,
  },
};

export const WaveOnce: Story = {
  args: {
    width: 500,
    height: 500,
    introAnimation: 'wave',
    animationRepeat: 'once',
    animationDuration: 2,
  },
};

export const WaveInfinite: Story = {
  args: {
    width: 500,
    height: 500,
    introAnimation: 'wave',
    animationRepeat: 'infinite',
    animationDuration: 2,
  },
};

export const FadeOnce: Story = {
  args: {
    width: 500,
    height: 500,
    introAnimation: 'fade',
    animationRepeat: 'once',
    animationDuration: 2,
  },
};

export const FadeInfinite: Story = {
  args: {
    width: 500,
    height: 500,
    introAnimation: 'fade',
    animationRepeat: 'infinite',
    animationDuration: 1.5,
  },
};

export const Static: Story = {
  args: {
    width: 500,
    height: 500,
    introAnimation: 'static',
  },
};

export const Wide: Story = {
  args: {
    width: 700,
    height: 400,
  },
};

export const Tall: Story = {
  args: {
    width: 400,
    height: 600,
  },
};

export const Small: Story = {
  args: {
    width: 300,
    height: 300,
  },
};
