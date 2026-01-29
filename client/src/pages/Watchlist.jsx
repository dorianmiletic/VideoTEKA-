import { useState, useEffect } from 'react'
import { userAPI } from '../services/api'
import { Link } from 'react-router-dom'
import { getPosterUrl } from '../utils/imageUrl'

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await userAPI.getWatchlist()
        setWatchlist(response.data)
      } catch (error) {
        console.error('Error fetching watchlist:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [])

  const handleRemove = async (tmdbId) => {
    try {
      await userAPI.removeFromWatchlist(tmdbId)
      setWatchlist(watchlist.filter(item => item.tmdbId !== tmdbId))
    } catch (error) {
      console.error('Error removing from watchlist:', error)
    }
  }

  const handleMarkWatched = async (item) => {
  try {
    await userAPI.addToWatched({
      tmdbId: item.tmdbId,
      type: item.type,
      title: item.title,
      posterPath: item.posterPath
    });

    // ukloni iz lokalnog watchlist state-a
    setWatchlist(watchlist.filter(i => i.tmdbId !== item.tmdbId));
  } catch (error) {
    console.error('Error marking as watched:', error);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">📋 Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl mb-4">Vaša watchlist je prazna</p>
          <Link to="/" className="text-primary hover:underline">
            Dodajte filmove i serije
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {watchlist.map((item) => (
            <div key={item.tmdbId} className="relative group">
              <Link to={`/details/${item.type}/${item.tmdbId}`}>
                <img
                  src={getPosterUrl(item.posterPath)}
                  alt={item.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </Link>

              {/* Remove */}
              <button
                onClick={() => handleRemove(item.tmdbId)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>

              {/* Pogledao */}
              <button
                onClick={() => handleMarkWatched(item)}
                className="absolute bottom-2 left-2 right-2 bg-green-600 hover:bg-green-700 text-sm py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                ✔ Pogledao
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist
