import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { tmdbAPI } from '../services/api'
import MovieGrid from '../components/MovieGrid'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState([])
  const [type, setType] = useState('movie')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return

    const searchContent = async () => {
      setLoading(true)
      try {
        const response = await tmdbAPI.search(query, type)
        setResults(response.data.results)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    searchContent()
  }, [query, type])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        Rezultati pretrage: <span className="text-primary">{query}</span>
      </h1>

      {/* Type Toggle */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setType('movie')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            type === 'movie' ? 'bg-primary' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Filmovi
        </button>
        <button
          onClick={() => setType('tv')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            type === 'tv' ? 'bg-primary' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Serije
        </button>
      </div>

      <MovieGrid items={results} type={type} loading={loading} />
    </div>
  )
}

export default Search
