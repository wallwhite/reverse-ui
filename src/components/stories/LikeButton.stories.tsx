import type { Meta, StoryObj } from '@storybook/react';
import { LikeButton } from '../../index';

const meta = {
  title: 'Components/LikeButton',
  component: LikeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
