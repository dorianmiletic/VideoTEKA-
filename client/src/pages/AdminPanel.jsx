import { useState, useEffect } from 'react'
import { movieAPI } from '../services/api'

const AdminPanel = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await movieAPI.getMovies()
      setMovies(response.data.movies)
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFeatured = async (id) => {
    try {
      await movieAPI.toggleFeatured(id)
      fetchMovies()
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Jeste li sigurni da želite obrisati ovaj film?')) return
    
    try {
      await movieAPI.deleteMovie(id)
      fetchMovies()
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8"> Admin Panel</h1>

      <div className="bg-dark-light rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Filmovi u bazi ({movies.length})</h2>
        
        {movies.length === 0 ? (
          <p className="text-gray-400">Nema filmova u bazi</p>
        ) : (
          <div className="space-y-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">
                    {movie.type === 'movie' ? 'Film' : 'Serija'} • 
                    TMDB ID: {movie.tmdbId} •
                    {movie.featured && ' ⭐ Featured'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleFeatured(movie._id)}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded transition"
                  >
                    {movie.featured ? 'Ukloni featured' : 'Označi featured'}
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                  >
                    Obriši
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
