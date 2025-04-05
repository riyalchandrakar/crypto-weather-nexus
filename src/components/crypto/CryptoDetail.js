import { HeartIcon, ArrowUpIcon, ArrowDownIcon, CurrencyDollarIcon, ChartBarIcon, ArrowsUpDownIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addFavorite, removeFavorite } from '../../redux/features/favoritesSlice'

export default function CryptoDetail({ crypto }) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.favorites.favorites || [])
  const isFavorite = favorites.includes(crypto.id)

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(crypto.id))
    } else {
      dispatch(addFavorite(crypto.id))
    }
  }

  const price = parseFloat(crypto.priceUsd).toFixed(2)
  const marketCap = (parseFloat(crypto.marketCapUsd) / 1000000000).toFixed(2)
  const volume = (parseFloat(crypto.volumeUsd24Hr) / 1000000000).toFixed(2)
  const change24h = parseFloat(crypto.changePercent24Hr).toFixed(2)
  const isPositive = change24h >= 0

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{crypto.name} ({crypto.symbol})</h2>
          <p className="text-gray-600">Rank: #{crypto.rank}</p>
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
            <CurrencyDollarIcon className="h-6 w-6 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-500">Price</p>
              <p className="text-3xl font-bold">${price}</p>
            </div>
          </div>

          <div className="flex items-center">
            <ChartBarIcon className="h-6 w-6 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-500">Market Cap</p>
              <p className="text-xl">${marketCap}B</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <ArrowsUpDownIcon className="h-6 w-6 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-500">24h Volume</p>
              <p className="text-xl">${volume}B</p>
            </div>
          </div>

          <div className="flex items-center">
            {isPositive ? (
              <ArrowUpIcon className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <ArrowDownIcon className="h-6 w-6 text-red-500 mr-2" />
            )}
            <div>
              <p className="text-gray-500">24h Change</p>
              <p className={`text-xl ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change24h}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}