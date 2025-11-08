import type { Meta, StoryObj } from '@storybook/react';
import { FingerprintScan } from '../../index';

const meta = {
  title: 'Components/FingerprintScan',
  component: FingerprintScan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    duration: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      description: 'Scan duration in seconds',
    },
    onComplete: {
      action: 'scan completed',
      description: 'Callback when scan completes',
    },
  },
} satisfies Meta<typeof FingerprintScan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    duration: 3,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>Click and hold to scan</p>
        <Story />
      </div>
    ),
  ],
};

export const FastScan: Story = {
  args: {
    duration: 1.5,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>Quick scan (1.5s)</p>
        <Story />
      </div>
    ),
  ],
};

export const SlowScan: Story = {
  args: {
    duration: 6,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '40px' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>Slow scan (6s)</p>
        <Story />
      </div>
    ),
  ],
};
