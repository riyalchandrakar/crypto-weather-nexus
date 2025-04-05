import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon 
} from '@heroicons/react/24/solid';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/', current: router.pathname === '/' },
    { name: 'Cryptocurrencies', href: '/crypto/bitcoin', current: router.pathname.startsWith('/crypto') },
    { name: 'Weather', href: '/city/new-york', current: router.pathname.startsWith('/city') },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white hover:text-yellow-300 transition-colors">
            CryptoWeather Nexus
          </Link>

          {/* Desktop Nav (hidden on mobile) */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${item.current ? 'text-white font-bold' : 'text-blue-100 hover:text-white'} transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button (hidden on desktop) */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu (shown when toggled) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 pb-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${item.current ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}