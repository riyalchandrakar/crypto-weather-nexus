import axios from 'axios'
import { toast } from 'react-hot-toast'

export const fetchNewsData = async () => {
  try {
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        q: 'cryptocurrency',
        language: 'en',
        size: 5
      }
    })
    return response.data.results
  } catch (error) {
    toast.error('Failed to fetch news')
    // Return mock data if API fails
    return [
      {
        title: 'Bitcoin reaches new all-time high',
        description: 'Bitcoin price surges past $60,000 mark',
        pubDate: new Date().toISOString(),
        source_id: 'mock'
      },
      // ... more mock items
    ]
  }
}