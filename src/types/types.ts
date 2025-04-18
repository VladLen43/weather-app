export interface WeatherData {
  dt: number
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
  }
  clouds: {
    all: number
  }
  weather: {
    main: string
    icon: string
  }[]
}

export interface ForecastResponse {
  list: WeatherData[]
  city: {
    name: string
  }
}

export interface CurrentWeatherResponse extends WeatherData {
  name: string
}

export interface TransformedWeatherData {
  datetime: Date | string
  date: string
  time: string
  temp: number
  feelsLike: number
  humidity: number
  pressure: number
  windSpeed: number
  clouds: number
  weather: string
  icon: string
  temp_ma?: number
}

export type ChartType = 'line' | 'histogram' | 'moving_avg' | 'combo'
export type TimeRange = '1day' | '3days' | '5days'

export enum TabValues {
  Combo = 'combo',
  Histogram = 'histogram',
  MovingAvg = 'movingAvg',
  Line = 'line',
}
