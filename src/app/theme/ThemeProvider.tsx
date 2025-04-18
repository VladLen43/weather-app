/* eslint-disable react-refresh/only-export-components */
import { createContext, JSX, ReactNode, useContext, useMemo, useState } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { darkTheme, lightTheme } from './theme'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  toggleTheme: () => void
  mode: ThemeMode
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'light',
})

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('theme') as ThemeMode) || 'light'
  })

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newMode)
      return newMode
    })
  }

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode])

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
