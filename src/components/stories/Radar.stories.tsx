import type { Meta, StoryObj } from '@storybook/react';
import { Radar } from '../../index';

const meta = {
  title: 'Components/Radar',
  component: Radar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};
