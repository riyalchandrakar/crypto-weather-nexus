import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getCryptoHistory } from '../../redux/features/cryptoSlice'
import Layout from '../../components/common/Layout'
import CryptoDetail from '../../components/crypto/CryptoDetail'
import CryptoChart from '../../components/crypto/CryptoChart'
import CryptoSelector from '../../components/crypto/CryptoSelector'

const cryptoMap = {
  'bitcoin': { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  'ethereum': { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  'solana': { id: 'solana', name: 'Solana', symbol: 'SOL' }
}

export default function CryptoDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  
  const { data: cryptoData, history } = useAppSelector(state => state.crypto)
  const currentCrypto = cryptoMap[id]
  const allCryptos = cryptoData || []
  const cryptoHistory = currentCrypto ? history[currentCrypto.id] : null

  useEffect(() => {
    if (currentCrypto?.id) {
      dispatch(getCryptoHistory({ id: currentCrypto.id, days: 30 }))
    }
  }, [currentCrypto?.id, dispatch])

  if (!currentCrypto || !allCryptos.length) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading cryptocurrency data...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CryptoSelector currentCrypto={id} cryptos={Object.entries(cryptoMap)} />
        <CryptoDetail crypto={allCryptos.find(c => c.id === currentCrypto.id)} />
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Price History (30 days)</h2>
          {cryptoHistory ? (
            <CryptoChart data={cryptoHistory} />
          ) : (
            <p>Loading price history...</p>
          )}
        </div>
      </div>
    </Layout>
  )
}