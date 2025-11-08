import type { Meta, StoryObj } from '@storybook/react';
import { GlowingOrb } from '../../index';

const meta = {
  title: 'Components/GlowingOrb',
  component: GlowingOrb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GlowingOrb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '60px' }}>
        <Story />
      </div>
    ),
  ],
};
