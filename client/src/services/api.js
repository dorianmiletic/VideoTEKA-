import axios from 'axios'
import useAuthStore from '../store/authStore'

const api = axios.create({
  baseURL: '/api',
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
}

// TMDB API
export const tmdbAPI = {
  getTrending: (mediaType = 'movie', timeWindow = 'week') => 
    api.get(`/tmdb/trending/${mediaType}/${timeWindow}`),
  search: (query, type = 'movie', page = 1) => 
    api.get('/tmdb/search', { params: { query, type, page } }),
  getDetails: (type, id) => 
    api.get(`/tmdb/details/${type}/${id}`),
  getPopular: (type = 'movie', page = 1) => 
    api.get('/tmdb/popular', { params: { type, page } }),
  getTopRated: (type = 'movie', page = 1) => 
    api.get('/tmdb/top-rated', { params: { type, page } }),
  getNowPlaying: (page = 1) => 
    api.get('/tmdb/now-playing', { params: { page } }),
  getUpcoming: (page = 1) => 
    api.get('/tmdb/upcoming', { params: { page } }),
  getGenres: (type = 'movie') => 
    api.get('/tmdb/genres', { params: { type } }),
  discover: (params) => 
    api.get('/tmdb/discover', { params }),
}

// User API
export const userAPI = {
  getFavorites: () => api.get('/users/favorites'),
  addToFavorites: (data) => api.post('/users/favorites', data),
  removeFromFavorites: (tmdbId) => api.delete(`/users/favorites/${tmdbId}`),
  getWatchlist: () => api.get('/users/watchlist'),
  addToWatchlist: (data) => api.post('/users/watchlist', data),
  removeFromWatchlist: (tmdbId) => api.delete(`/users/watchlist/${tmdbId}`),
}

// Movie API (Admin)
export const movieAPI = {
  getMovies: (params) => api.get('/movies', { params }),
  addMovie: (data) => api.post('/movies', data),
  updateMovie: (id, data) => api.put(`/movies/${id}`, data),
  deleteMovie: (id) => api.delete(`/movies/${id}`),
  toggleFeatured: (id) => api.patch(`/movies/${id}/featured`),
}

export default api
