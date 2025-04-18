import { TransformedWeatherData, WeatherData } from '../types/types'
import { CurrentWeatherResponse, ForecastResponse } from '../types/types'
import axios from 'axios'

type A = CurrentWeatherResponse | ForecastResponse

const fetchData = async <T extends A>(url: string) => {
  const { data } = await axios.get<T>(url)
  if (!data) {
    throw new Error('Cannot get Weather data')
  }
  return data
}

console.log(import.meta.env.API_KEY)

export const getWeatherData = async (city: string) => {
  const [current, forecast] = await Promise.all([
    fetchData<CurrentWeatherResponse>(
      `${import.meta.env.VITE_BASE_URL}/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
    ),
    fetchData<ForecastResponse>(
      `${import.meta.env.VITE_BASE_URL}/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric&cnt=40`,
    ),
  ])

  return { current, forecast }
}

export const transformForecastData = (forecastList: WeatherData[]): TransformedWeatherData[] => {
  return forecastList.map((item) => ({
    datetime: new Date(item.dt * 1000),
    date: new Date(item.dt * 1000).toLocaleDateString(),
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: item.main.temp,
    feelsLike: item.main.feels_like,
    humidity: item.main.humidity,
    pressure: item.main.pressure,
    windSpeed: item.wind.speed,
    clouds: item.clouds.all,
    weather: item.weather[0].main,
    icon: item.weather[0].icon,
  }))
}

export const calculateMovingAverage = (data: TransformedWeatherData[], key: keyof TransformedWeatherData, windowSize: number = 5) => {
  return data.map((item, index) => {
    const start = Math.max(0, index - windowSize)
    const end = index + 1

    const windowData = data.slice(start, end)
    const sum = windowData.reduce((acc, curr) => acc + (curr[key] as number), 0)

    return {
      ...item,
      [`${key}_ma`]: sum / windowData.length,
    }
  })
}
