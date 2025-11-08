import type { Meta, StoryObj } from '@storybook/react';
import { XRay } from '../../index';

const meta = {
  title: 'Components/XRay',
  component: XRay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to apply X-Ray effect to',
    },
  },
} satisfies Meta<typeof XRay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ color: 'white' }}>
        <h1>X-Ray Effect</h1>
        <p>Move your mouse around to reveal hidden content!</p>
      </div>
    ),
  },
};

export const WithText: Story = {
  args: {
    children: (
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h2>Scan Me</h2>
        <p>Interactive X-Ray Scanner</p>
      </div>
    ),
  },
};
