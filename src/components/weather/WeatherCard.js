import { HeartIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addFavorite, removeFavorite } from '../../redux/features/favoritesSlice'

export default function WeatherCard({ city, isFavorite }) {
  const dispatch = useAppDispatch()

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(city.id))
    } else {
      dispatch(addFavorite(city.id))
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${isFavorite ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{city.name}</h3>
          <p className="text-gray-600">{city.weather[0].description}</p>
        </div>
        <button 
          onClick={handleFavorite}
          className="text-gray-400 hover:text-red-500 focus:outline-none"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
        </button>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} 
            alt={city.weather[0].description}
            className="w-16 h-16"
          />
          <span className="text-3xl font-bold">
            {Math.round(city.main.temp)}°C
          </span>
        </div>
        
        <div className="text-right">
          <p>Humidity: {city.main.humidity}%</p>
          <p>Wind: {city.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  )
}