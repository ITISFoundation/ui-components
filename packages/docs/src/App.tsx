import { Button, createTheme, CssBaseline, MenuItem, PaletteMode, Theme, ThemeProvider } from '@mui/material'
import { Workbench } from '@ui-components/workbench'
import { Workbench as WorkbenchT } from '@ui-components/workbench/dist/types'
import React, { useState } from 'react'
import { ContextMenu, ContextMenuItem } from '@ui-components/material-context'

export const initialWorkbench: WorkbenchT = {
  nodes: [
    {
      id: '1',
      label: 'Node #1',
      inputs: [
        { id: 'x', label: 'In' }
      ],
      outputs: [
        { id: 'a', label: 'E(m,a)' },
        { id: 'f', label: 'F(b)' }
      ],
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      label: 'B',
      inputs: [
        { id: 'b', label: 'Field value' },
        { id: 'c', label: 'Power (W)' }
      ],
      outputs: [
        { id: 'd', label: 'Out' },
        { id: 'd2', label: 'Out2' }
      ],
      position: { x: 270, y: 0 }
    },
    {
      id: '3',
      label: 'Third node',
      inputs: [
        { id: 'yu', label: 'Ch' }
      ],
      outputs: [],
      position: { x: 500, y: 40 }
    },
    {
      id: '4',
      label: 'Plotter',
      inputs: [
        { id: 'p', label: 'D' }
      ],
      outputs: [],
      position: { x: 500, y: 140 }
    }
  ],
  connections: [
    { orig: 'a', dest: 'b' },
    { orig: 'a', dest: 'c' },
    { orig: 'd', dest: 'yu' },
    { orig: 'f', dest: 'p' },
    // { orig: 'd2', dest: 'p' }
  ]
}

const App = () => {
  const [theme, setTheme] = useState<Theme>(createTheme({ palette: { mode: 'light' }}))
  const [anchor, setAnchor] = useState<Element>()
  const changeTheme = (mode: PaletteMode) => {
    setTheme(createTheme({ palette: { mode }}))
  }
  const contextHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setAnchor(e.currentTarget)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div>
          <Button disabled={theme.palette.mode === 'light'} onClick={() => changeTheme('light')}>Light</Button>
          <Button disabled={theme.palette.mode === 'dark'} onClick={() => changeTheme('dark')}>Dark</Button>
          <div onContextMenu={contextHandler} style={{ height: 30, width: 30, border: `1px solid ${theme.palette.text.primary}` }}></div>
          <ContextMenu
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={() => setAnchor(undefined)}
            dense
          >
            <ContextMenuItem title='Save'/>
            <ContextMenuItem checked title='Close' shortcut='Ctrl+W'/>
            <ContextMenuItem title='More'>
              <ContextMenuItem title='Option'/>
              <ContextMenuItem title='Option 2'/>
            </ContextMenuItem>
          </ContextMenu>
        </div>
        <Workbench workbench={initialWorkbench} style={{ flex: 1 }}/>
      </div>
    </ThemeProvider>
  )
}

export default App
