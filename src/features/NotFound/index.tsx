import { Box, Button, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h1" color="text.primary">
        404
      </Typography>
      <Typography variant="h6" color="text.primary">
        Такая страница не существует
      </Typography>
      <Button
        sx={{ marginTop: '10px', bgcolor: theme.palette.secondary.main }}
        onClick={() => navigate('/')}
        variant="contained"
      >
        Назад домой
      </Button>
    </Box>
  )
}
