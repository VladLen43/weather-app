import { useState } from 'react'
import { Box, Button, FormHelperText, TextField, Typography, useTheme } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChangeThemeButton } from '../../shared/ChangeThemeButton'
import classes from './Login.module.scss'
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

  const onSubmit: SubmitHandler<IFormInputs> = ({ userName, password }) => {
    setError('')
    if (userName === 'admin' && password === 'admin') {
      const exampleToken = getMockData()
      localStorage.setItem('authToken', exampleToken)
      navigate(from, { replace: true })
    } else {
      setError('Неверное имя пользователя или пароль')
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
