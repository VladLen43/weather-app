import { JSX } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts'
import { TransformedWeatherData } from '../../../types/types'
import classes from './TemperatureHistogram.module.scss'
import { useTheme } from '@mui/material'

interface Props {
  data: TransformedWeatherData[]
}

export const TemperatureHistogram = ({ data }: Props): JSX.Element => {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} label={{ value: 'Дата', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Температура (°C)', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          wrapperClassName={classes.tooltip}
          formatter={(value: number) => [`${Math.floor(value)} °C`, 'Температура']}
          labelFormatter={(label: string) => `Дата: ${label}`}
          labelClassName={classes.tooltipLabel}
        />
        <Bar dataKey="temp" fill={theme.palette.warning.main} name="Температура" />
        <Brush dataKey="time" height={30} y={370} stroke={theme.palette.info.main} fill={theme.palette.secondary.light} />
      </BarChart>
    </ResponsiveContainer>
  )
}
