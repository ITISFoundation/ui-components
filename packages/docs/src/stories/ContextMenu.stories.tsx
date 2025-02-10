import React, { useRef } from 'react'

import type { Meta, StoryObj } from '@storybook/react';
import StyledContextMenu, { ContextMenu } from '@ui-components/context-menu/src/components/ContextMenu'
import { ContextMenuItem } from '@ui-components/context-menu/src/components/ContextMenuItem'
import { styled } from '@mui/material'
import menu from './menuExample'

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  subcomponents: { ContextMenuItem: ContextMenuItem as React.FunctionComponent<unknown> },
  title: 'Context menus/Context menu',
  render: args => <StyledContextMenu {...args}/>
};
 
export default meta;

type Story = StoryObj<typeof ContextMenu>;

const PrimaryExample = styled(StyledContextMenu)`
  display: flex;
  position: static;
  & > .MuiMenu-paper {
    position: static;
  }
`

export const Primary: Story = {
  args: {
    open: true,
    dense: false,
    menu
  },
  render: args => <PrimaryExample disablePortal {...args}/>
};
