import type { Meta, StoryObj } from '@storybook/react';
import { SMSAlert } from '../../index';

const meta = {
  title: 'Components/SMSAlert',
  component: SMSAlert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the alert',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
  },
} satisfies Meta<typeof SMSAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Acme UI',
    description: 'Your verification code is 123456',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LoginCode: Story = {
  args: {
    title: 'Login Verification',
    description: 'Use code 987654 to complete your login',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};

export const PaymentConfirmation: Story = {
  args: {
    title: 'Payment Alert',
    description: 'Transaction of $99.99 completed successfully',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};
