import React from 'react'

import type { Meta, StoryObj } from '@storybook/react';
import StyledContextMenu, { ContextMenu } from '@ui-components/context-menu/src/components/ContextMenu'
import { ContextMenuProps } from '@ui-components/context-menu/src/types';
import { ContextMenuItem } from '@ui-components/context-menu/src/components/ContextMenuItem';

const menu: ContextMenuProps['menu'] = [
  {
    title: 'Abrir nuevo documento',
    shortcut: 'Ctrl+N'
  }, {
    title: 'Colores',
    submenu: [
      { title: 'Rojo' },
      { title: 'Azul' }
    ]
  }
]

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  subcomponents: { ContextMenuItem: ContextMenuItem as React.FunctionComponent<unknown> },
  title: 'Context menus/Context menu',
  render: args => <StyledContextMenu {...args}/>
};
 
export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Primary: Story = {
  args: {
    open: true,
    menu
  },
  render: props => (
    <StyledContextMenu {...props}/>
  )
};
