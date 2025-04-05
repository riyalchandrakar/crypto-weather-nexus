import NewsCard from './NewsCard'

export default function NewsList({ news }) {
  return (
    <div className="space-y-4">
      {news?.map((item, index) => (
        <NewsCard key={index} newsItem={item} />
      ))}
    </div>
  )
}