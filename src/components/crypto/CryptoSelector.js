import Link from 'next/link'

export default function CryptoSelector({ currentCrypto, cryptos }) {
  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
      {cryptos.map(([key, crypto]) => (
        <Link 
          key={key}
          href={`/crypto/${key}`}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            currentCrypto === key 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {crypto.name} ({crypto.symbol})
        </Link>
      ))}
    </div>
  )
}