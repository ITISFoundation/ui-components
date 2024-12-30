import { Button, createTheme, CssBaseline, PaletteMode, Theme, ThemeProvider } from '@mui/material'
import { TestRete } from '@ui-components/workbench'
import { useState } from 'react'

const App = () => {
  const [theme, setTheme] = useState<Theme>(createTheme({ palette: { mode: 'light' }}))
  const changeTheme = (mode: PaletteMode) => {
    setTheme(createTheme({ palette: { mode }}))
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Button disabled={theme.palette.mode === 'light'} onClick={() => changeTheme('light')}>Light</Button>
      <Button disabled={theme.palette.mode === 'dark'} onClick={() => changeTheme('dark')}>Dark</Button>
      <TestRete/>
    </ThemeProvider>
  )
}

export default App
