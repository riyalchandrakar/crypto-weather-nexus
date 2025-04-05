import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getWeatherHistory } from '../../redux/features/weatherSlice'
import Layout from '../../components/common/Layout'
import WeatherDetail from '../../components/weather/WeatherDetail'
import WeatherChart from '../../components/weather/WeatherChart'
import CitySelector from '../../components/weather/CitySelector'

const cityMap = {
  'new-york': { id: 5128581, name: 'New York' },
  'london': { id: 2643743, name: 'London' },
  'tokyo': { id: 1850147, name: 'Tokyo' }
}

export default function CityDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  
  const { data: weatherData, history } = useAppSelector(state => state.weather)
  const currentCity = cityMap[id]
  const allCities = weatherData || []
  const cityHistory = currentCity ? history[currentCity.id] : null

  useEffect(() => {
    if (currentCity?.id) {
      dispatch(getWeatherHistory(currentCity.id))
    }
  }, [currentCity?.id, dispatch])

  if (!currentCity || !allCities.length) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading city data...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CitySelector currentCity={id} cities={Object.entries(cityMap)} />
        <WeatherDetail city={allCities.find(c => c.id === currentCity.id)} />
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Weather History</h2>
          {cityHistory ? (
            <WeatherChart data={cityHistory} />
          ) : (
            <p>Loading weather history...</p>
          )}
        </div>
      </div>
    </Layout>
  )
}