import type { Meta, StoryObj } from '@storybook/react';
import { RoleBasedAccessControl } from '../../index';

const meta = {
  title: 'Components/RoleBasedAccessControl',
  component: RoleBasedAccessControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoleBasedAccessControl>;

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
