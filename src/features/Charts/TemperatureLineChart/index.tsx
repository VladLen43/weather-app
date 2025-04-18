import { JSX } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts'
import { TransformedWeatherData } from '../../../types/types'
import classes from './TemperatureLineChart.module.scss'
import { useTheme } from '@mui/material'

interface Props {
  data: TransformedWeatherData[]
}

export const TemperatureLineChart = ({ data }: Props): JSX.Element => {
  const theme = useTheme()
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12 }}
          label={{ value: 'Время', position: 'insideBottom', offset: -5 }}
        />
        <YAxis label={{ value: 'Температура (°C)', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          wrapperClassName={classes.tooltip}
          formatter={(value: number) => [`${Math.floor(value)} °C`, 'Температура']}
          labelFormatter={(label: string) => `Время: ${label}`}
          labelClassName={classes.tooltipLabel}
        />
        <Line
          type="monotone"
          dataKey="temp"
          stroke={theme.palette.warning.main}
          activeDot={{ r: 8 }}
          name="Температура"
        />
        <Brush
          dataKey="time"
          height={30}
          y={370}
          stroke={theme.palette.info.main}
          fill={theme.palette.secondary.light}
        />{' '}
      </LineChart>
    </ResponsiveContainer>
  )
}
