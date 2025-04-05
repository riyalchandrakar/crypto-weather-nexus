import WeatherCard from './WeatherCard'
import { useAppSelector } from '../../redux/hooks'

export default function WeatherList({ cities }) {
  const favorites = useAppSelector(state => state.favorites.favorites || [])
  
  return (
    <div className="space-y-4">
      {cities?.map(city => (
        <WeatherCard 
          key={city.id} 
          city={city} 
          isFavorite={favorites.includes(city.id)}
        />
      ))}
    </div>
  )
}