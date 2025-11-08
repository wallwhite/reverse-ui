import type { Meta, StoryObj } from '@storybook/react';
import { MultifactorAuthentication } from '../../index';

const meta = {
  title: 'Components/MultifactorAuthentication',
  component: MultifactorAuthentication,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MultifactorAuthentication>;

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
