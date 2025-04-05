import { toast } from 'react-hot-toast'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import { store } from '../redux/store'
import { updateCryptoPrice } from '../redux/features/cryptoSlice'

export const setupWebSocket = (dispatch) => {
  // Crypto Price WebSocket
  const cryptoWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana')

  cryptoWs.onmessage = (msg) => {
    const data = JSON.parse(msg.data)
    Object.entries(data).forEach(([id, price]) => {
      dispatch(updateCryptoPrice({ id, price }))
      
      const currentState = store.getState()
      const crypto = currentState.crypto.data.find(c => c.id === id)
      if (crypto) {
        const prevPrice = parseFloat(crypto.priceUsd)
        const newPrice = parseFloat(price)
        const change = ((newPrice - prevPrice) / prevPrice) * 100
        
        if (Math.abs(change) > 2) {
          toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}
              max-w-md w-full bg-white shadow-lg rounded-lg border border-gray-200 pointer-events-auto flex`}>
              <div className="flex-1 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    {change > 0 ? (
                      <ArrowUpIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {id.toUpperCase()} Price Alert
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Price {change > 0 ? 'increased' : 'decreased'} by {Math.abs(change).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ), {
            position: 'top-right',
            duration: 3000
          })
        }
      }
    })
  }

  // Simulated Weather Alerts
  const weatherAlertInterval = setInterval(() => {
    const cities = ['New York', 'London', 'Tokyo']
    const alerts = [
      { type: 'storm', message: 'Storm warning issued', icon: '⚡', bg: 'bg-yellow-100' },
      { type: 'heat', message: 'Heat advisory in effect', icon: '🔥', bg: 'bg-red-100' },
      { type: 'flood', message: 'Flood watch activated', icon: '🌊', bg: 'bg-blue-100' }
    ]
    
    if (Math.random() > 0.7) {
      const randomCity = cities[Math.floor(Math.random() * cities.length)]
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)]
      
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}
          max-w-md w-full ${randomAlert.bg} shadow-lg rounded-lg border ${randomAlert.type === 'storm' ? 'border-yellow-200' : randomAlert.type === 'heat' ? 'border-red-200' : 'border-blue-200'} pointer-events-auto flex`}>
          <div className="flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-xl">
                {randomAlert.icon}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Weather Alert for {randomCity}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {randomAlert.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      ), {
        position: 'top-right',
        duration: 5000
      })
    }
  }, 30000)

  return () => {
    cryptoWs.close()
    clearInterval(weatherAlertInterval)
  }
}