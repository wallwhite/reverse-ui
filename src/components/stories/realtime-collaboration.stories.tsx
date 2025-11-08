import type { Meta, StoryObj } from '@storybook/react';
import { RealtimeCollaboration } from '../../index';

const meta = {
  title: 'Components/RealtimeCollaboration',
  component: RealtimeCollaboration,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RealtimeCollaboration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          Move your mouse to see cursor collaboration
        </p>
        <Story />
      </div>
    ),
  ],
};
