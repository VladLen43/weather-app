import { useState } from 'react'
import { Box, Button, FormHelperText, TextField, Typography, useTheme, Link } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { ChangeThemeButton } from '../../shared/ChangeThemeButton'
import classes from './Login.module.scss'
import bcrypt from 'bcryptjs'
import { User } from '../../types/types'
import { getMockData } from '../../utils'

interface IFormInputs {
  userName: string
  password: string
}

export const Login = () => {
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const theme = useTheme()

  const from = location.state?.from?.pathname || '/'

  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      userName: '',
      password: '',
    },
    mode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<IFormInputs> = async ({ userName, password }) => {
    setError('')
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
    const user = users.find((u: User) => u.userName === userName)
    const token = getMockData()

    if (!user) {
      setError('Пользователь не найден')
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      setError('Неверный пароль')
      return
    }

    localStorage.setItem('authToken', token)
    navigate(from, { replace: true })
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.paper">
      <Box
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: 'secondary.light',
        }}
        className={classes.form}
      >
        <ChangeThemeButton className={classes.changeTheme} />
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            textAlign: 'center',
            color: theme.palette.text.primary,
          }}
        >
          Вход в систему
        </Typography>

        {error && (
          <FormHelperText error sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </FormHelperText>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Controller
            name="userName"
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Имя пользователя"
                variant="outlined"
                size="small"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Пароль"
                type="password"
                variant="outlined"
                size="small"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
          <Link
            component={RouterLink}
            sx={{
              '&:visited': {
                color: theme.palette.text.primary,
              },
              textDecoration: 'none',
              color: theme.palette.text.primary,
              fontWeight: 500,
            }}
            to="/register"
            state={{ from: location.state?.from || { pathname: '/' } }}
          >
            Ещё нет аккаунта? Зарегистрироваться
          </Link>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: '10px',
              backgroundColor: '#6495ED',
            }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
