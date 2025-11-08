import type { Meta, StoryObj } from '@storybook/react';
import { StackedCards } from '../../index';

const meta = {
  title: 'Components/StackedCards',
  component: StackedCards,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sensitivity: {
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: 'Drag sensitivity threshold',
    },
    dimensions: {
      control: 'object',
      description: 'Card dimensions (width and height)',
    },
    images: {
      control: 'object',
      description: 'Array of image URLs',
    },
  },
} satisfies Meta<typeof StackedCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sensitivity: 220,
    dimensions: { width: 220, height: 220 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '60px' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          Drag cards to reorder them
        </p>
        <Story />
      </div>
    ),
  ],
};

export const LargeCards: Story = {
  args: {
    sensitivity: 300,
    dimensions: { width: 300, height: 300 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&h=600&fit=crop',
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '60px' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          Drag cards to reorder them
        </p>
        <Story />
      </div>
    ),
  ],
};

export const HighSensitivity: Story = {
  args: {
    sensitivity: 100,
    dimensions: { width: 220, height: 220 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop',
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#161616', padding: '60px' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          Cards move to back with less drag (high sensitivity)
        </p>
        <Story />
      </div>
    ),
  ],
};
