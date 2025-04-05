import Link from 'next/link'

export default function CitySelector({ currentCity, cities }) {
  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
      {cities.map(([key, city]) => (
        <Link 
          key={key}
          href={`/city/${key}`}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            currentCity === key 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {city.name}
        </Link>
      ))}
    </div>
  )
}