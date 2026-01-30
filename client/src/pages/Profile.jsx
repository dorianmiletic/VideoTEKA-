import { useState, useEffect } from 'react'
import useAuthStore from '../store/authStore'
import { userAPI } from '../services/api'
import { getPosterUrl } from '../utils/imageUrl'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user } = useAuthStore()
  const [favorites, setFavorites] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [watched, setWatched] = useState([]) // <-- dodano
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const favRes = await userAPI.getFavorites()
        setFavorites(favRes.data)

        const watchRes = await userAPI.getWatchlist()
        setWatchlist(watchRes.data)

        const watchedRes = await userAPI.getWatched() // <-- poziv API-ja
        setWatched(watchedRes.data)

      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserLists()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8"> Profil korisnika</h1>

      <div className="mb-8">
        <p><strong>Korisničko ime:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Uloga:</strong> {user.role}</p>
        <p><strong>Račun kreiran:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🎬 Pogledano</h2>
        {watched.length === 0 ? <p>Niste označili nijedan film/seriju kao pogledano</p> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {watched.map(item => (
              <Link key={item.tmdbId} to={`/details/${item.type}/${item.tmdbId}`}>
                <img
                  src={getPosterUrl(item.posterPath)}
                  alt={item.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
