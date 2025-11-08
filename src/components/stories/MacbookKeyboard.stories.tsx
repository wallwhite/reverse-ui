import type { Meta, StoryObj } from '@storybook/react';
import { MacbookKeyboard } from '../../index';

const meta = {
  title: 'Components/MacbookKeyboard',
  component: MacbookKeyboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MacbookKeyboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          Type on your keyboard to see the keys light up
        </p>
        <Story />
      </div>
    ),
  ],
};
