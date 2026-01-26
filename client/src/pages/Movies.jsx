import { useState, useEffect } from 'react'
import { tmdbAPI } from '../services/api'
import MovieGrid from '../components/MovieGrid'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [category, setCategory] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        let response
        switch (category) {
          case 'popular':
            response = await tmdbAPI.getPopular('movie', page)
            break
          case 'top_rated':
            response = await tmdbAPI.getTopRated('movie', page)
            break
          case 'now_playing':
            response = await tmdbAPI.getNowPlaying(page)
            break
          case 'upcoming':
            response = await tmdbAPI.getUpcoming(page)
            break
          default:
            response = await tmdbAPI.getPopular('movie', page)
        }
        setMovies(response.data.results)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [category, page])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">🎬 Filmovi</h1>

      {/* Category Filter */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {[
          { value: 'popular', label: 'Popularni' },
          { value: 'top_rated', label: 'Najbolje ocijenjeni' },
          { value: 'now_playing', label: 'Trenutno u kinu' },
          { value: 'upcoming', label: 'Uskoro' }
        ].map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setCategory(cat.value)
              setPage(1)
            }}
            className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
              category === cat.value
                ? 'bg-primary'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <MovieGrid items={movies} type="movie" loading={loading} />

      {/* Pagination */}
      {!loading && movies.length > 0 && (
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

export default Movies
