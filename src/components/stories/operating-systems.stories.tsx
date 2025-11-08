import type { Meta, StoryObj } from '@storybook/react';
import { OperatingSystems } from '../../index';

const meta = {
  title: 'Components/OperatingSystems',
  component: OperatingSystems,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OperatingSystems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
