import type { Meta, StoryObj } from '@storybook/react';
import { SpeedyCircles } from '../../index';

const meta = {
  title: 'Components/SpeedyCircles',
  component: SpeedyCircles,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content inside the circles animation',
    },
  },
} satisfies Meta<typeof SpeedyCircles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Speedy</div>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '400px', background: '#161616' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithText: Story = {
  args: {
    children: <div style={{ color: 'white', fontSize: '18px' }}>Hover Me</div>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '400px', background: '#161616' }}>
        <Story />
      </div>
    ),
  ],
};
