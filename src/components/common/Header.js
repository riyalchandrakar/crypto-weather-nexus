import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white hover:text-yellow-300 transition-colors">
            CryptoWeather Nexus
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className={`${router.pathname === '/' ? 'text-white font-bold' : 'text-blue-100 hover:text-white transition-colors'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/crypto/bitcoin" 
              className={`${router.pathname.startsWith('/crypto') ? 'text-white font-bold' : 'text-blue-100 hover:text-white transition-colors'}`}
            >
              Cryptocurrencies
            </Link>
            <Link 
              href="/city/new-york" 
              className={`${router.pathname.startsWith('/city') ? 'text-white font-bold' : 'text-blue-100 hover:text-white transition-colors'}`}
            >
              Weather
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}