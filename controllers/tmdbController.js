import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY || '238b3868cb0f98251613160cbfe735fd';
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

console.log('🔑 TMDB_API_KEY:', TMDB_API_KEY);
console.log('🌐 TMDB_BASE_URL:', TMDB_BASE_URL);

const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US'
  }
});

// Get trending movies/TV shows
export const getTrending = async (req, res) => {
  try {
    const { mediaType = 'movie', timeWindow = 'week' } = req.params;
    const response = await tmdbAxios.get(`/trending/${mediaType}/${timeWindow}`);
    res.json(response.data);
  } catch (error) {
    console.error('TMDB trending error:', error);
    res.status(500).json({ message: 'Error fetching trending', error: error.message });
  }
};

// Search movies/TV shows
export const search = async (req, res) => {
  try {
    const { query, type = 'movie', page = 1 } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const endpoint = type === 'tv' ? '/search/tv' : '/search/movie';
    const response = await tmdbAxios.get(endpoint, {
      params: { query, page }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('TMDB search error:', error);
    res.status(500).json({ message: 'Error searching', error: error.message });
  }
};

// Get movie/TV show details
export const getDetails = async (req, res) => {
  try {
    const { type, id } = req.params;
    const endpoint = type === 'tv' ? `/tv/${id}` : `/movie/${id}`;
    
    const response = await tmdbAxios.get(endpoint, {
      params: {
        append_to_response: 'credits,videos,similar,recommendations'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('TMDB details error:', error);
    res.status(500).json({ message: 'Error fetching details', error: error.message });
  }
};

// Get popular movies/TV shows
export const getPopular = async (req, res) => {
  try {
    const { type = 'movie', page = 1 } = req.query;
    const endpoint = type === 'tv' ? '/tv/popular' : '/movie/popular';
    
    const response = await tmdbAxios.get(endpoint, {
      params: { page }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('TMDB popular error:', error);
    res.status(500).json({ message: 'Error fetching popular', error: error.message });
  }
};

// Get top rated movies/TV shows
export const getTopRated = async (req, res) => {
  try {
    const { type = 'movie', page = 1 } = req.query;
    const endpoint = type === 'tv' ? '/tv/top_rated' : '/movie/top_rated';
    
    const response = await tmdbAxios.get(endpoint, {
      params: { page }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('TMDB top rated error:', error);
    res.status(500).json({ message: 'Error fetching top rated', error: error.message });
  }
};

// Get now playing movies
export const getNowPlaying = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await tmdbAxios.get('/movie/now_playing', {
      params: { page }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('TMDB now playing error:', error);
    res.status(500).json({ message: 'Error fetching now playing', error: error.message });
  }
};

// Get upcoming movies
export const getUpcoming = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await tmdbAxios.get('/movie/upcoming', {
      params: { page }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('TMDB upcoming error:', error);
    res.status(500).json({ message: 'Error fetching upcoming', error: error.message });
  }
};

// Get genres
export const getGenres = async (req, res) => {
  try {
    const { type = 'movie' } = req.query;
    const endpoint = type === 'tv' ? '/genre/tv/list' : '/genre/movie/list';
    
    const response = await tmdbAxios.get(endpoint);
    res.json(response.data);
  } catch (error) {
    console.error('TMDB genres error:', error);
    res.status(500).json({ message: 'Error fetching genres', error: error.message });
  }
};

// Discover movies/TV shows by filters
export const discover = async (req, res) => {
  try {
    const { type = 'movie', ...filters } = req.query;
    const endpoint = type === 'tv' ? '/discover/tv' : '/discover/movie';
    
    const response = await tmdbAxios.get(endpoint, {
      params: filters
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('TMDB discover error:', error);
    res.status(500).json({ message: 'Error discovering', error: error.message });
  }
};
