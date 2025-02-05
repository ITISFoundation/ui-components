import React from 'react'

import type { Meta, StoryObj } from '@storybook/react';
import StyledWorkbench, { Workbench } from '@ui-components/workbench/src/components/Workbench'
import { initialWorkbench } from '../App';

import { Paper } from '@mui/material';
import { Workbench as WorkbenchT } from '@ui-components/workbench/src/types';

let key=0
let lastWorkbench: WorkbenchT | undefined

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
  title: 'Workbench/Workbench',
  render: args => {
    const workbenchChanged = args.workbench !== lastWorkbench
    lastWorkbench = args.workbench
    return <StyledWorkbench key={workbenchChanged ? ++key : key} {...args}/>
  }
};
 
export default meta;

type Story = StoryObj<typeof Workbench>;

export const Primary: Story = {
  args: {
    workbench: initialWorkbench,
    areaTransform: { x: 140, y: 75, k: 1 },
    style: { height: '100%' }
  },
  argTypes: {
    style: {
      table: {
        disable: true
      }
    },
    areaTransform: {
      table: {
        disable: true
      }
    }
  }
};
