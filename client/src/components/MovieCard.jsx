import { Link } from 'react-router-dom'
import { getPosterUrl } from '../utils/imageUrl'

const MovieCard = ({ item, type = 'movie' }) => {
  const title = item.title || item.name
  const releaseDate = item.release_date || item.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'

  return (
    <Link to={`/details/${type}/${item.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
        <img
          src={getPosterUrl(item.poster_path)}
          alt={title}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 w-full">
            <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{year}</span>
              <span className="bg-primary px-2 py-1 rounded text-xs">
                ⭐ {item.vote_average?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
