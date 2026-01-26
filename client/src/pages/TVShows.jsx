import { useState, useEffect } from 'react'
import { tmdbAPI } from '../services/api'
import MovieGrid from '../components/MovieGrid'

const TVShows = () => {
  const [shows, setShows] = useState([])
  const [category, setCategory] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true)
      try {
        let response
        if (category === 'popular') {
          response = await tmdbAPI.getPopular('tv', page)
        } else {
          response = await tmdbAPI.getTopRated('tv', page)
        }
        setShows(response.data.results)
      } catch (error) {
        console.error('Error fetching TV shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [category, page])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">📺 TV Serije</h1>

      {/* Category Filter */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => {
            setCategory('popular')
            setPage(1)
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            category === 'popular'
              ? 'bg-primary'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Popularni
        </button>
        <button
          onClick={() => {
            setCategory('top_rated')
            setPage(1)
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            category === 'top_rated'
              ? 'bg-primary'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Najbolje ocijenjeni
        </button>
      </div>

      <MovieGrid items={shows} type="tv" loading={loading} />

      {/* Pagination */}
      {!loading && shows.length > 0 && (
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-6 py-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
          >
            ← Prethodna
          </button>
          <span className="px-6 py-2 bg-gray-800 rounded-lg">Stranica {page}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            Sljedeća →
          </button>
        </div>
      )}
    </div>
  )
}

export default TVShows
