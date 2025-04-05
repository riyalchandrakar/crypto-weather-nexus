import axios from 'axios'
import { toast } from 'react-hot-toast'

const API_URL = 'https://api.coincap.io/v2'

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${API_URL}/assets?ids=bitcoin,ethereum,solana`)
    return response.data.data
  } catch (error) {
    toast.error('Failed to fetch cryptocurrency data')
    throw error
  }
}

export const fetchCryptoHistory = async (id, days = '30') => {
  try {
    const response = await axios.get(`${API_URL}/assets/${id}/history`, {
      params: {
        interval: 'd1',
        start: Date.now() - (days * 24 * 60 * 60 * 1000),
        end: Date.now()
      }
    })
    return response.data.data
  } catch (error) {
    toast.error(`Failed to fetch history for ${id}`)
    throw error
  }
}

export const setupWebSocket = (dispatch) => {
  const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana')

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    Object.entries(data).forEach(([id, price]) => {
      dispatch(updateCryptoPrice({ id, price }))
      
      // Show notification for significant price changes
      if (Math.abs(priceChangePercentage) > 2) {
        toast.success(`${id.toUpperCase()} price ${priceChangePercentage > 0 ? 'increased' : 'decreased'} by ${Math.abs(priceChangePercentage)}%`, {
          icon: priceChangePercentage > 0 ? '📈' : '📉'
        })
      }
    })
  }

  return () => socket.close()
}