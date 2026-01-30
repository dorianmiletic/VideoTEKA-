import { useState, useEffect } from 'react'
import { adminAPI } from '../services/api'

const AdminPanel = () => {
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [moviesRes, usersRes, reviewsRes] = await Promise.all([
        adminAPI.getMovies(),
        adminAPI.getUsers(),
        adminAPI.getReviews(),
      ])
      setMovies(moviesRes.data)
      setUsers(usersRes.data)
      setReviews(reviewsRes.data)
    } catch (err) {
      console.error('Error fetching admin data:', err)
      setError('Greška prilikom dohvaćanja podataka')
    } finally {
      setLoading(false)
    }
  }

  // ---- Movie Handlers ----
  const handleToggleFeatured = async (id) => {
    try {
      await adminAPI.toggleFeatured(id)
      fetchAll()
    } catch (err) {
      console.error('Error toggling featured movie:', err)
    }
  }

  const handleDeleteMovie = async (id) => {
    if (!window.confirm('Jeste li sigurni da želite obrisati ovaj film?')) return
    try {
      await adminAPI.deleteMovie(id)
      fetchAll()
    } catch (err) {
      console.error('Error deleting movie:', err)
    }
  }

  // ---- User Handlers ----
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Jeste li sigurni da želite obrisati ovog korisnika?')) return
    try {
      await adminAPI.deleteUser(id)
      fetchAll()
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  // ---- Review Handlers ----
  const handleDeleteReview = async (id) => {
    if (!window.confirm('Jeste li sigurni da želite obrisati ovu recenziju?')) return
    try {
      await adminAPI.deleteReview(id)
      fetchAll()
    } catch (err) {
      console.error('Error deleting review:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>

      {/* MOVIES */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🎬 Filmovi ({movies.length})</h2>
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
                    {movie.type === 'movie' ? 'Film' : 'Serija'} • TMDB ID: {movie.tmdbId}{' '}
                    {movie.featured && '⭐ Featured'}
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
                    onClick={() => handleDeleteMovie(movie._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                  >
                    Obriši
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* USERS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">👤 Korisnici ({users.length})</h2>
        {users.length === 0 ? (
          <p className="text-gray-400">Nema registriranih korisnika</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{user.username}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-400">Role: {user.role}</p>
                </div>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Obriši
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* REVIEWS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">💬 Recenzije ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-400">Nema recenzija</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-200 font-semibold">{review.user.username}</p>
                  <p className="text-gray-400 text-sm">{review.comment}</p>
                  <p className="text-gray-400 text-xs">Film/Serija: {review.tmdbId}</p>
                </div>
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Obriši
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default AdminPanel
