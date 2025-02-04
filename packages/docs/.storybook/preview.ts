import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      }
    }
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: createTheme({ palette: { mode: 'light' }}),
        dark: createTheme({ palette: { mode: 'dark' }})
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline
    })
  ],
  tags: ['autodocs']
};

export default preview;
