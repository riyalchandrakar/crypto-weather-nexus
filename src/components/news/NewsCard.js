import Link from 'next/link'
import { format } from 'date-fns'

export default function NewsCard({ newsItem }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{newsItem.title}</h3>
      <p className="text-gray-600 mb-3">{newsItem.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{format(new Date(newsItem.pubDate), 'MMM d, yyyy h:mm a')}</span>
        <Link 
          href={newsItem.link || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  )
}