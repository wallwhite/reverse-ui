import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NavigationIndicator } from '../../index';

const meta = {
  title: 'Components/NavigationIndicator',
  component: NavigationIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of navigation items',
    },
    activeIndex: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Currently active item index',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when item is clicked',
    },
  },
} satisfies Meta<typeof NavigationIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const NavigationWithState = (args: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ background: '#161616', padding: '40px' }}>
      <NavigationIndicator
        {...args}
        activeIndex={activeIndex}
        onClick={(index) => setActiveIndex(index)}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <NavigationWithState {...args} />,
  args: {
    items: ['Home', 'About', 'Services', 'Portfolio', 'Contact'],
  },
};

export const FewItems: Story = {
  render: (args) => <NavigationWithState {...args} />,
  args: {
    items: ['Introduction', 'Features', 'Pricing'],
  },
};

export const ManyItems: Story = {
  render: (args) => <NavigationWithState {...args} />,
  args: {
    items: [
      'Overview',
      'Getting Started',
      'Installation',
      'Configuration',
      'Components',
      'API Reference',
      'Examples',
      'FAQ',
    ],
  },
};
