import WeatherCharts from './WeatherCharts'
import { useEffect, useState } from 'react'
import { getWeatherData, transformForecastData } from '../../api/weatherService'
import { TransformedWeatherData } from '../../types/types'
import { Toast } from '../../shared/Toast'

export const Charts = () => {
  const [weatherData, setWeatherData] = useState<TransformedWeatherData[]>([])
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const getAllData = async () => {
    setLoading(true)
    try {
      const {
        forecast: { list },
      } = await getWeatherData('Moscow')
      const transformedData = transformForecastData(list)
      setWeatherData(transformedData)
    } catch (error) {
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <WeatherCharts data={weatherData} />
      {showToast && <Toast open={showToast} handleOpen={setShowToast} />}
    </>
  )
}
