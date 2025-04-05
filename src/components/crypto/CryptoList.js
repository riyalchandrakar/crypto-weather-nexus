import CryptoCard from './CryptoCard'
import { useAppSelector } from '../../redux/hooks'

export default function CryptoList({ cryptos }) {
  const favorites = useAppSelector(state => state.favorites.favorites || [])
  
  return (
    <div className="space-y-4">
      {cryptos?.map(crypto => (
        <CryptoCard 
          key={crypto.id} 
          crypto={crypto} 
          isFavorite={favorites.includes(crypto.id)}
        />
      ))}
    </div>
  )
}