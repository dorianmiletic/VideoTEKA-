import { useState, useEffect } from 'react'
import { userAPI } from '../services/api'
import { Link } from 'react-router-dom'
import { getPosterUrl } from '../utils/imageUrl'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await userAPI.getFavorites()
        setFavorites(response.data)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleRemove = async (tmdbId) => {
    try {
      await userAPI.removeFromFavorites(tmdbId)
      setFavorites(favorites.filter(fav => fav.tmdbId !== tmdbId))
    } catch (error) {
      console.error('Error removing favorite:', error)
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
      <h1 className="text-4xl font-bold mb-8">❤ Omiljeni</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl mb-4">Nemate omiljenih naslova</p>
          <Link to="/" className="text-primary hover:underline">
            Pregledajte filmove i serije
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favorites.map((item) => (
            <div key={item.tmdbId} className="relative group">
              <Link to={`/details/${item.type}/${item.tmdbId}`}>
                <img
                  src={getPosterUrl(item.posterPath)}
                  alt={item.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </Link>
              <button
                onClick={() => handleRemove(item.tmdbId)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
