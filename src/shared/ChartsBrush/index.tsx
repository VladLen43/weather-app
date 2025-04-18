import { useTheme } from '@mui/material'
import { Brush } from 'recharts'

export const ChartsBrush = () => {
  const theme = useTheme()
  return (
    <Brush
      dataKey="time"
      height={30}
      y={370}
      stroke={theme.palette.secondary.dark}
      fill={theme.palette.secondary.light}
    />
  )
}
