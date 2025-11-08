import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from '../../index';

const meta = {
  title: 'Components/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
      description: 'Rating value (0-5)',
    },
    maxRating: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Maximum number of stars',
    },
    size: {
      control: { type: 'range', min: 16, max: 48, step: 4 },
      description: 'Star size in pixels',
    },
    color: {
      control: 'color',
      description: 'Star color',
    },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 3.5,
  },
};

export const FullRating: Story = {
  args: {
    rating: 5,
  },
};

export const HalfRating: Story = {
  args: {
    rating: 2.5,
  },
};

export const LowRating: Story = {
  args: {
    rating: 1,
  },
};

export const CustomColor: Story = {
  args: {
    rating: 4,
    color: '#ff6b6b',
  },
};

export const LargeStars: Story = {
  args: {
    rating: 4,
    size: 36,
  },
};

export const TenStars: Story = {
  args: {
    rating: 7,
    maxRating: 10,
  },
};
