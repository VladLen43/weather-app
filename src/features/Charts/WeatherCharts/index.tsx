import { JSX, SyntheticEvent, useState } from 'react'
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Tabs, Tab, SelectChangeEvent, Container } from '@mui/material'
import { MovingAverageChart } from '../MovingAverage/index'
import { ComboChart } from '../ComboChart/index'
import { TemperatureHistogram } from '../TemperatureHistogram/index'
import { TemperatureLineChart } from '../TemperatureLineChart'
import { TransformedWeatherData, TimeRange, TabValues } from '../../../types/types'
import { calculateMovingAverage } from '../../../api/weatherService'

interface Props {
  data: TransformedWeatherData[]
}

const WeatherCharts = ({ data }: Props): JSX.Element => {
  const [chartType, setChartType] = useState(TabValues.Combo)
  const [timeRange, setTimeRange] = useState<TimeRange>('3days')

  const onTabChange = (_: SyntheticEvent, value: TabValues) => {
    setChartType(value)
  }

  const handleTimeRangeChange = ({ target: { value } }: SelectChangeEvent<TimeRange>) => {
    setTimeRange(value as TimeRange)
  }

  const filterData = (): TransformedWeatherData[] => {
    const filtered = calculateMovingAverage(data, 'temp')

    if (timeRange === '1day') return filtered.slice(0, 8)
    if (timeRange === '3days') return filtered.slice(0, 24)
    return filtered
  }

  const renderChart = () => {
    const chartData = filterData()

    switch (chartType) {
      case TabValues.Line:
        return <TemperatureLineChart data={chartData} />
      case TabValues.Histogram:
        return <TemperatureHistogram data={chartData} />
      case TabValues.MovingAvg:
        return <MovingAverageChart data={chartData} />
      case TabValues.Combo:
      default:
        return <ComboChart data={chartData} />
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pb: 10 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, pb: 7, borderRadius: 6, backgroundColor: 'background.paper' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Анализ погоды в Москве
          </Typography>
        </Box>

        <Tabs
          value={chartType}
          onChange={onTabChange}
          sx={{
            mb: 2,
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab
            sx={{ borderRadius: 10, bgcolor: chartType === TabValues.Combo ? 'secondary.light' : 'transparent' }}
            value={TabValues.Combo}
            label="Температура и влажность"
          />
          <Tab
            sx={{ borderRadius: 10, bgcolor: chartType === TabValues.Line ? 'secondary.light' : 'transparent' }}
            value={TabValues.Line}
            label="Линейный график"
          />
          <Tab
            sx={{ borderRadius: 10, bgcolor: chartType === TabValues.Histogram ? 'secondary.light' : 'transparent' }}
            value={TabValues.Histogram}
            label="Гистограмма"
          />
          <Tab
            sx={{ borderRadius: 10, bgcolor: chartType === TabValues.MovingAvg ? 'secondary.light' : 'transparent' }}
            value={TabValues.MovingAvg}
            label="Скользящее среднее"
          />
        </Tabs>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FormControl sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel>Диапазон</InputLabel>
            <Select value={timeRange} onChange={handleTimeRangeChange} label="Диапазон">
              <MenuItem value="1day">1 день</MenuItem>
              <MenuItem value="3days">3 дня</MenuItem>
              <MenuItem value="5days">5 дней</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {renderChart()}
      </Paper>
    </Container>
  )
}

export default WeatherCharts
