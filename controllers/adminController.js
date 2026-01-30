import Movie from '../models/Movie.js'
import User from '../models/User.js'
import Review from '../models/Review.js'

// ----- Movies -----
export const getAllMovies = async (req, res) => {
  const movies = await Movie.find()
  res.json(movies)
}

export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id)
  res.json({ message: 'Film obrisan' })
}

export const toggleFeaturedMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) return res.status(404).json({ message: 'Film nije pronađen' })
  movie.featured = !movie.featured
  await movie.save()
  res.json(movie)
}

// ----- Users -----
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
}

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: 'Korisnik obrisan' })
}

// ----- Reviews -----
export const getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate('user', 'username email')
  res.json(reviews)
}

export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id)
  res.json({ message: 'Recenzija obrisana' })
}
