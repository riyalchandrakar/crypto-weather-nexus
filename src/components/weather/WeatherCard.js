export default function WeatherCard({ city, isFavorite }) {
  return (
    <div className={`border-2 border-blue-200 rounded-lg p-4 ${isFavorite ? 'bg-blue-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">{city.name}</h3>
          <p className="text-blue-700 capitalize">{city.weather[0].description}</p>
        </div>
        <button onClick={handleFavorite}>
          <HeartIcon className={`h-6 w-6 ${isFavorite ? 'text-red-600' : 'text-blue-300'}`} />
        </button>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
            alt={city.weather[0].description}
            className="w-16 h-16"
          />
          <span className="text-3xl font-bold text-blue-900">
            {Math.round(city.main.temp)}°C
          </span>
        </div>
        
        <div className="text-right">
          <p className="text-blue-800">Humidity: {city.main.humidity}%</p>
          <p className="text-blue-800">Wind: {city.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}