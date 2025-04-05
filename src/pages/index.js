import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getCryptoData } from '../redux/features/cryptoSlice'
import { getWeatherData } from '../redux/features/weatherSlice'
import { getNewsData } from '../redux/features/newsSlice'
import { setupWebSocket } from '../services/websocketService'
import Layout from '../components/common/Layout'
import {
  SunIcon,
  CloudIcon,
  BoltIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  NewspaperIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { data: cryptoData } = useAppSelector(state => state.crypto)
  const { data: weatherData } = useAppSelector(state => state.weather)
  const { data: newsData } = useAppSelector(state => state.news)

  useEffect(() => {
    dispatch(getCryptoData())
    dispatch(getWeatherData())
    dispatch(getNewsData())
    const cleanup = setupWebSocket(dispatch)
    return () => cleanup()
  }, [dispatch])

  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case 'clear': return <SunIcon className="h-8 w-8 text-yellow-500" />
      case 'clouds': return <CloudIcon className="h-8 w-8 text-gray-400" />
      case 'rain': 
      case 'drizzle': return <BoltIcon className="h-8 w-8 text-blue-400" />
      default: return <SunIcon className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Market Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Section */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
            <div className="flex items-center mb-6">
              <SunIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Global Weather</h2>
            </div>
            
            <div className="space-y-4">
              {weatherData?.map(city => (
                <div key={city.id} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{city.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{city.weather[0].description}</p>
                    </div>
                    {getWeatherIcon(city.weather[0].main)}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-gray-800">
                        {Math.round(city.main.temp)}°C
                      </span>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 mr-1">Humidity:</span>
                        <span className="font-medium text-gray-700">{city.main.humidity}%</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 mr-1">Wind:</span>
                        <span className="font-medium text-gray-700">{city.wind.speed} m/s</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Crypto Section */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border border-purple-200">
            <div className="flex items-center mb-6">
              <ChartBarIcon className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Cryptocurrencies</h2>
            </div>
            
            <div className="space-y-4">
              {cryptoData?.map(crypto => {
                const change24h = parseFloat(crypto.changePercent24Hr).toFixed(2)
                const isPositive = change24h >= 0
                const price = parseFloat(crypto.priceUsd).toFixed(2)
                const marketCap = (parseFloat(crypto.marketCapUsd) / 1000000000).toFixed(2)
                
                return (
                  <div key={crypto.id} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{crypto.name}</h3>
                        <p className="text-sm text-gray-600">{crypto.symbol}</p>
                      </div>
                      <span className="text-lg font-bold text-gray-800">${price}</span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? (
                          <ArrowUpIcon className="h-5 w-5 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-5 w-5 mr-1" />
                        )}
                        <span>{Math.abs(change24h)}%</span>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Market Cap</p>
                        <p className="text-sm font-medium text-gray-700">${marketCap}B</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* News Section */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200">
            <div className="flex items-center mb-6">
              <NewspaperIcon className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Latest News</h2>
            </div>
            
            <div className="space-y-4">
              {newsData?.slice(0, 5).map((news, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow border border-gray-200">
                  <h3 className="text-md font-medium text-gray-800 mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{news.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{news.source_id || 'Unknown Source'}</span>
                    <span>{new Date(news.pubDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}