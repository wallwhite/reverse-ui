import type { Meta, StoryObj } from '@storybook/react';
import { LinkPreview } from '../../index';

const meta = {
  title: 'Components/LinkPreview',
  component: LinkPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Link URL',
    },
    children: {
      control: 'text',
      description: 'Link text',
    },
    imageSrc: {
      control: 'text',
      description: 'Preview image URL',
    },
    imageWidth: {
      control: { type: 'range', min: 100, max: 400, step: 20 },
      description: 'Preview image width',
    },
  },
} satisfies Meta<typeof LinkPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://example.com',
    children: 'Hover to see preview',
    imageSrc: 'https://via.placeholder.com/300x200',
    imageWidth: 220,
  },
};

export const WidePreview: Story = {
  args: {
    href: 'https://example.com',
    children: 'Wide preview image',
    imageSrc: 'https://via.placeholder.com/400x200',
    imageWidth: 320,
  },
};

export const SmallPreview: Story = {
  args: {
    href: 'https://example.com',
    children: 'Small preview',
    imageSrc: 'https://via.placeholder.com/200x150',
    imageWidth: 150,
  },
};
