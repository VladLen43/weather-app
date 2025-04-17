import { Box, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import classes from './Header.module.scss'
import { ChangeThemeButton } from '../../shared/ChangeThemeButton'

export const Header = () => {
  const navigate = useNavigate()
  const isAuth = useAuth()
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <Box className={classes.header} bgcolor="secondary.light" color="text.primary">
      <Link color="text.primary" to="/charts">
        Чарты
      </Link>
      <ChangeThemeButton />
      <Button
        className={classes.loginButton}
        color="primary"
        onClick={!isAuth ? () => navigate('/login') : handleLogout}
      >
        {isAuth ? 'Выйти' : 'Войти'}
      </Button>
    </Box>
  )
}
