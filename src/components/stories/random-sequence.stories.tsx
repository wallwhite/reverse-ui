import type { Meta, StoryObj } from '@storybook/react';
import { RandomSequence } from '../../index';

const meta = {
  title: 'Components/RandomSequence',
  component: RandomSequence,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RandomSequence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
