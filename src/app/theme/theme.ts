import { blue, grey, indigo, orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom?: {
      shadows?: string[]
    }
  }
  interface ThemeOptions {
    custom?: {
      shadows?: string[]
    }
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[500],
      light: blue[200],
      dark: blue[800],
    },
    secondary: {
      main: indigo[500],
      light: indigo[100],
      dark: indigo[600],
    },
    info: {
      main: grey[700],
    },
    warning: {
      main: orange[600],
    },
    background: {
      paper: grey[200],
    },
    text: {
      primary: grey[900],
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[200],
      light: blue[100],
      dark: blue[500],
    },
    secondary: {
      main: indigo[300],
      light: indigo[300],
      dark: indigo[800],
    },
    info: {
      main: grey[300],
    },
    warning: {
      main: orange[400],
    },
    background: {
      default: '#293133',
      paper: '#293133',
    },
    text: {
      primary: grey[100],
    },
  },
  custom: {
    shadows: ['0px 2px 4px rgba(0, 0, 0, 0.5)'],
  },
})
