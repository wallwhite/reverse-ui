import type { Meta, StoryObj } from '@storybook/react';
import { InteractiveEnvelope } from '../../index';

const meta = {
  title: 'Components/InteractiveEnvelope',
  component: InteractiveEnvelope,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InteractiveEnvelope>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
