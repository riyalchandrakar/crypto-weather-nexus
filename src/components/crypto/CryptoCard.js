import { HeartIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addFavorite, removeFavorite } from '../../redux/features/favoritesSlice'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function CryptoCard({ crypto, isFavorite }) {
  const dispatch = useAppDispatch()
  
  const priceChange24h = parseFloat(crypto.changePercent24Hr).toFixed(2)
  const isPositive = priceChange24h >= 0
  const price = parseFloat(crypto.priceUsd).toFixed(2)
  const marketCap = (parseFloat(crypto.marketCapUsd) / 1000000000).toFixed(2) + 'B'

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isFavorite) {
      dispatch(removeFavorite(crypto.id))
      toast.success('Removed from favorites')
    } else {
      dispatch(addFavorite(crypto.id))
      toast.success('Added to favorites')
    }
  }

  return (
    <Link href={`/crypto/${crypto.id}`}>
      <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${isFavorite ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{crypto.name}</h3>
            <p className="text-gray-600">{crypto.symbol}</p>
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
          <span className="text-2xl font-bold">${price}</span>
          
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <ArrowUpIcon className="h-5 w-5 mr-1" />
            ) : (
              <ArrowDownIcon className="h-5 w-5 mr-1" />
            )}
            <span>{Math.abs(priceChange24h)}%</span>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          Market Cap: ${marketCap}
        </div>
      </div>
    </Link>
  )
}