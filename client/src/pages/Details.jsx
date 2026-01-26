import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { tmdbAPI, userAPI } from '../services/api'
import { getBackdropUrl, getPosterUrl } from '../utils/imageUrl'
import useAuthStore from '../store/authStore'

const Details = () => {
  const { type, id } = useParams()
  const { isAuthenticated } = useAuthStore()
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await tmdbAPI.getDetails(type, id)
        setDetails(response.data)
      } catch (error) {
        console.error('Error fetching details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [type, id])

  const handleAddToFavorites = async () => {
    try {
      const title = details.title || details.name
      await userAPI.addToFavorites({
        tmdbId: parseInt(id),
        type,
        title,
        posterPath: details.poster_path
      })
      setIsFavorite(true)
    } catch (error) {
      console.error('Error adding to favorites:', error)
    }
  }

  const handleAddToWatchlist = async () => {
    try {
      const title = details.title || details.name
      await userAPI.addToWatchlist({
        tmdbId: parseInt(id),
        type,
        title,
        posterPath: details.poster_path
      })
      setIsInWatchlist(true)
    } catch (error) {
      console.error('Error adding to watchlist:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!details) return null

  const title = details.title || details.name
  const releaseDate = details.release_date || details.first_air_date

  return (
    <div>
      {/* Backdrop */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${getBackdropUrl(details.backdrop_path)})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <img
            src={getPosterUrl(details.poster_path)}
            alt={title}
            className="w-64 rounded-lg shadow-2xl"
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>
            
            {details.tagline && (
              <p className="text-xl text-gray-400 italic mb-4">{details.tagline}</p>
            )}

            <div className="flex items-center space-x-6 mb-6 text-sm">
              <span className="bg-primary px-3 py-1 rounded">
                ⭐ {details.vote_average?.toFixed(1)}
              </span>
              {releaseDate && (
                <span>{new Date(releaseDate).getFullYear()}</span>
              )}
              {details.runtime && <span>{details.runtime} min</span>}
              {details.status && <span>{details.status}</span>}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {details.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Pregled</h2>
              <p className="text-gray-300 leading-relaxed">{details.overview}</p>
            </div>

            {/* Actions */}
            {isAuthenticated && (
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToFavorites}
                  disabled={isFavorite}
                  className="bg-primary hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {isFavorite ? '✓ U omiljenim' : '❤ Dodaj u omiljene'}
                </button>
                <button
                  onClick={handleAddToWatchlist}
                  disabled={isInWatchlist}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {isInWatchlist ? '✓ U watchlisti' : '+ Dodaj u watchlist'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
