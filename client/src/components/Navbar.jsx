import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuthStore from '../store/authStore'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-dark-light sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            VideoTEKA<span className="text-white">+</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary transition">Početna</Link>
            <Link to="/movies" className="hover:text-primary transition">Filmovi</Link>
            <Link to="/tv-shows" className="hover:text-primary transition">Serije</Link>
            {isAuthenticated && (
              <>
                <Link to="/favorites" className="hover:text-primary transition">Omiljeni</Link>
                <Link to="/watchlist" className="hover:text-primary transition">Watchlist</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hover:text-primary transition">Admin</Link>
                )}
              </>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <input
              type="text"
              placeholder="Pretraži..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Pozdrav, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-primary hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  Odjavi se
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary transition">Prijava</Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  Registracija
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
