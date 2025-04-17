import { IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { JSX } from 'react'
import { useThemeContext } from '../../app/theme/ThemeProvider'

interface Props {
  className?: string
}

export const ChangeThemeButton = ({ className }: Props): JSX.Element => {
  const { toggleTheme, mode } = useThemeContext()
  return (
    <IconButton className={className} sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
