import React from 'react'

import type { Meta, StoryObj } from '@storybook/react';
import StyledContextMenu, { ContextMenu } from '@ui-components/context-menu/src/components/ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  decorators: [
    Story => {
      return (
        <div>
          <Story/>
        </div>
      )
    }
  ],
  title: 'Context menu/Context menu',
  render: args => <StyledContextMenu {...args}/>
};
 
export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Primary: Story = {
  args: {
  },
  argTypes: {
  }
};
