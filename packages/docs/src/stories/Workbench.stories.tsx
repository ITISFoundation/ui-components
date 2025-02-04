import React from 'react'

import type { Meta, StoryObj } from '@storybook/react';
import StyledWorkbench, { Workbench } from '@ui-components/workbench/src/components/Workbench'
import { initialWorkbench } from '../App';

import { Paper } from '@mui/material';

const meta: Meta<typeof Workbench> = {
  component: Workbench,
  decorators: [
    Story => {
      return (
        <Paper style={{ height: 400, boxShadow: 'none' }}>
          <Story/>
        </Paper>
      )
    }
  ],
  title: 'Workbench/Workbench'
};
 
export default meta;

type Story = StoryObj<typeof Workbench>;

export const Primary: Story = {
  args: {
    workbench: initialWorkbench,
    style: { height: '100%' }
  },
  argTypes: {
    style: {
      table: {
        disable: true
      }
    }
  },
  decorators: [
    (_, { args }) => <StyledWorkbench {...args}/>
  ]
};
