import { useState } from 'react'
import { Box, Button, FormHelperText, TextField, Typography, useTheme, Link } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { ChangeThemeButton } from '../../shared/ChangeThemeButton'
import classes from './Register.module.scss'
import bcrypt from 'bcryptjs'
import { getMockData } from '../../utils'
import { User } from '../../types/types'

interface IFormInputs {
  userName: string
  password: string
  confirmPassword: string
}

export const Register = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const from = location?.state?.from?.pathname || '/'

  const { handleSubmit, control, watch } = useForm<IFormInputs>({
    defaultValues: {
      userName: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<IFormInputs> = async ({ userName, password }) => {
    setError('')

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[]
    const userExists = existingUsers.some((user: User) => user.userName === userName)

    if (userExists) {
      setError('Пользователь с таким именем уже существует')
      return
    }

    // сгенерировал хэш для пароля чтобы безопасно хранить его в localStorage

    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const token = getMockData()

      const newUser = {
        userName,
        password: hashedPassword,
      }

      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]))
      localStorage.setItem('authToken', token)

      navigate(from, {
        replace: true,
      })
    } catch (err) {
      setError('Ошибка при регистрации')
    }
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
          Регистрация
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
            rules={{
              required: 'Обязательное поле',
              minLength: { value: 5, message: 'Минимум 5 символов' },
            }}
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

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Обязательное поле',
              validate: (value) => value === watch('password') || 'Пароли не совпадают',
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Подтвердите пароль"
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
            to="/login"
            state={{ from: location.state?.from || { pathname: '/' } }}
          >
            Уже есть аккаунт? Войти
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
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
