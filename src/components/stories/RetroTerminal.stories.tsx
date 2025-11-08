import type { Meta, StoryObj } from '@storybook/react';
import { RetroTerminal } from '../../index';

const meta = {
  title: 'Components/RetroTerminal',
  component: RetroTerminal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RetroTerminal>;

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
