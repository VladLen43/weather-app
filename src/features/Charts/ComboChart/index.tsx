import { JSX } from 'react'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts'
import { TransformedWeatherData } from '../../../types/types'
import classes from './ComboChart.module.scss'
import { useTheme } from '@mui/material'

interface Props {
  data: TransformedWeatherData[]
}

export const ComboChart = ({ data }: Props): JSX.Element => {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data} margin={{ right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tick={{ fontSize: 12 }} label={{ value: 'Время', position: 'insideBottom', offset: -5 }} />
        <YAxis yAxisId="left" label={{ value: 'Температура (°C)', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'Влажность (%)', angle: 90, position: 'insideRight' }} />
        <Tooltip
          wrapperClassName={classes.tooltip}
          formatter={(value: number, name: string) => {
            const unit = name === 'Температура' ? '°C' : '%'
            return [`${Math.floor(value)} ${unit}`, name]
          }}
          labelFormatter={(label: string) => `Время: ${label}`}
          labelClassName={classes.tooltipLabel}
        />
        <Line yAxisId="left" type="monotone" dataKey="temp" stroke={theme.palette.warning.main} activeDot={{ r: 6 }} name="Температура" />
        <Line yAxisId="right" type="monotone" dataKey="humidity" stroke={theme.palette.primary.main} name="Влажность" />
        <Brush dataKey="time" height={30} y={370} stroke={theme.palette.info.main} fill={theme.palette.secondary.light} />{' '}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
