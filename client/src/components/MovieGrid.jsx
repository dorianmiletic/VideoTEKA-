import MovieCard from './MovieCard'

const MovieGrid = ({ items, type = 'movie', loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl">Nema rezultata</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <MovieCard key={item.id} item={item} type={type} />
      ))}
    </div>
  )
}

export default MovieGrid
