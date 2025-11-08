import type { Meta, StoryObj } from '@storybook/react';
import { ParticleVortex } from '../../index';

const meta = {
  title: 'Components/ParticleVortex',
  component: ParticleVortex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    centerSize: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
      description: 'Size of the center circle',
    },
    particleCount: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Number of particles',
    },
    discCount: {
      control: { type: 'range', min: 5, max: 50, step: 5 },
      description: 'Number of concentric discs',
    },
    lineCount: {
      control: { type: 'range', min: 20, max: 200, step: 10 },
      description: 'Number of radial lines',
    },
    particleSpeed: {
      control: { type: 'range', min: 0.001, max: 0.02, step: 0.001 },
      description: 'Speed of particles',
    },
    discSpeed: {
      control: { type: 'range', min: 0.0001, max: 0.005, step: 0.0001 },
      description: 'Speed of disc rotation',
    },
    color: {
      control: 'color',
      description: 'Color of the vortex',
    },
  },
} satisfies Meta<typeof ParticleVortex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    centerSize: 128,
    particleCount: 500,
    discCount: 20,
    lineCount: 100,
    particleSpeed: 0.005,
    discSpeed: 0.001,
    color: '#222',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', width: '600px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Minimal: Story = {
  args: {
    centerSize: 100,
    particleCount: 200,
    discCount: 10,
    lineCount: 50,
    particleSpeed: 0.003,
    discSpeed: 0.0005,
    color: '#444',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', width: '600px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Intense: Story = {
  args: {
    centerSize: 150,
    particleCount: 800,
    discCount: 30,
    lineCount: 150,
    particleSpeed: 0.008,
    discSpeed: 0.002,
    color: '#111',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', width: '600px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
