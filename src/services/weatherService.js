import axios from 'axios'
import { toast } from 'react-hot-toast'

const API_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchWeatherData = async () => {
  try {
    const cities = [
      { id: 5128581, name: 'New York' },
      { id: 2643743, name: 'London' },
      { id: 1850147, name: 'Tokyo' }
    ]
    
    const requests = cities.map(city => 
      axios.get(`${API_URL}/weather`, {
        params: {
          id: city.id,
          units: 'metric',
          appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY
        }
      })
    )
    
    const responses = await Promise.all(requests)
    return responses.map((res, index) => ({
      ...res.data,
      name: cities[index].name
    }))
  } catch (error) {
    toast.error('Failed to fetch weather data')
    throw error
  }
}

export const fetchWeatherHistory = async (cityId) => {
  try {
    // Note: Historical data requires paid plan in OpenWeatherMap
    // This is a mock implementation
    const response = await axios.get(`${API_URL}/forecast`, {
      params: {
        id: cityId,
        units: 'metric',
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        cnt: 5
      }
    })
    return response.data
  } catch (error) {
    toast.error('Failed to fetch weather history')
    throw error
  }
}