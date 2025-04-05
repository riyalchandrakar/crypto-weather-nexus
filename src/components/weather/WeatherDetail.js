import { 
    HeartIcon, 
    ArrowUpIcon, 
    ArrowDownIcon,
    SunIcon,
    CloudIcon,
    BoltIcon,
    MapPinIcon
  } from '@heroicons/react/24/solid'
  import { useAppDispatch, useAppSelector } from '../../redux/hooks'
  import { addFavorite, removeFavorite } from '../../redux/features/favoritesSlice'
  
  export default function WeatherDetail({ city }) {
    const dispatch = useAppDispatch()
    const favorites = useAppSelector(state => state.favorites.favorites || [])
    const isFavorite = favorites.includes(city.id)
  
    const handleFavorite = () => {
      if (isFavorite) {
        dispatch(removeFavorite(city.id))
      } else {
        dispatch(addFavorite(city.id))
      }
    }
  
    const getWeatherIcon = () => {
      const main = city.weather[0].main.toLowerCase()
      switch(main) {
        case 'clear':
          return <SunIcon className="h-8 w-8 text-yellow-500" />
        case 'clouds':
          return <CloudIcon className="h-8 w-8 text-gray-400" />
        case 'rain':
        case 'drizzle':
          return <BoltIcon className="h-8 w-8 text-blue-400" />
        default:
          return <SunIcon className="h-8 w-8 text-yellow-500" />
      }
    }
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <MapPinIcon className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-bold">{city.name}</h2>
          </div>
          <button 
            onClick={handleFavorite}
            className="text-gray-400 hover:text-red-500 focus:outline-none"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon className={`h-8 w-8 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              {getWeatherIcon()}
              <div className="ml-4">
                <p className="text-gray-500">Conditions</p>
                <p className="text-xl capitalize">{city.weather[0].description}</p>
              </div>
            </div>
  
            <div className="flex items-center">
              <SunIcon className="h-6 w-6 text-yellow-500 mr-2" />
              <div>
                <p className="text-gray-500">Temperature</p>
                <p className="text-3xl font-bold">{Math.round(city.main.temp)}°C</p>
                <p className="text-sm text-gray-500">
                  Feels like: {Math.round(city.main.feels_like)}°C
                </p>
              </div>
            </div>
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center">
              <ArrowUpIcon className="h-6 w-6 text-red-500 mr-2" />
              <div>
                <p className="text-gray-500">High / Low</p>
                <p className="text-xl">
                  {Math.round(city.main.temp_max)}° / {Math.round(city.main.temp_min)}°
                </p>
              </div>
            </div>
  
            <div className="flex items-center">
              <ArrowDownIcon className="h-6 w-6 text-blue-500 mr-2" />
              <div>
                <p className="text-gray-500">Humidity</p>
                <p className="text-xl">{city.main.humidity}%</p>
              </div>
            </div>
  
            <div className="flex items-center">
              <BoltIcon className="h-6 w-6 text-gray-500 mr-2" />
              <div>
                <p className="text-gray-500">Wind</p>
                <p className="text-xl">{city.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }