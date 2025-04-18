import { Box, Button, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { ChangeThemeButton } from '../../shared/ChangeThemeButton'

export const Header = () => {
  const navigate = useNavigate()
  const isAuth = useAuth()
  const theme = useTheme()

  const handleLogout = () => {
    if (isAuth) {
      localStorage.removeItem('authToken')
    }
    navigate('/login')
  }

  return (
    <Box display="flex" gap="10px" justifyContent="flex-end" alignItems="center" p="10px" bgcolor="secondary.light" color="text.primary">
      <ChangeThemeButton />
      <Button sx={{ bgcolor: theme.palette.secondary.dark, color: '#eeeeee' }} onClick={!isAuth ? () => navigate('/login') : handleLogout}>
        {isAuth ? 'Выйти' : 'Войти'}
      </Button>
    </Box>
  )
}
