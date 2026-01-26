import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { tmdbAPI } from '../services/api'
import MovieGrid from '../components/MovieGrid'
import { getBackdropUrl } from '../utils/imageUrl'

const Home = () => {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, popularRes] = await Promise.all([
          tmdbAPI.getTrending('movie', 'week'),
          tmdbAPI.getPopular('movie')
        ])
        
        setTrending(trendingRes.data.results.slice(0, 12))
        setPopular(popularRes.data.results.slice(0, 12))
        setHero(trendingRes.data.results[0])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      {hero && (
        <div 
          className="relative h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${getBackdropUrl(hero.backdrop_path)})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-end pb-20">
              <div className="max-w-2xl">
                <h1 className="text-5xl font-bold mb-4">{hero.title}</h1>
                <p className="text-lg mb-6 line-clamp-3">{hero.overview}</p>
                <div className="flex space-x-4">
                  <Link 
                    to={`/details/movie/${hero.id}`}
                    className="bg-primary hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition inline-block"
                  >
                    ℹ Više informacija
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">🔥 Trending ovaj tjedan</h2>
        <MovieGrid items={trending} type="movie" />
      </div>

      {/* Popular */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">⭐ Popularni filmovi</h2>
        <MovieGrid items={popular} type="movie" />
      </div>
    </div>
  )
}

export default Home
