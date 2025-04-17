import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
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
      <Button onClick={() => navigate('/')} variant="contained">
        Назад домой
      </Button>
    </Box>
  )
}
