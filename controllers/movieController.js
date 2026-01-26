import Movie from '../models/Movie.js';

// Get all movies from database
export const getMovies = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, featured } = req.query;
    const query = {};
    
    if (type) query.type = type;
    if (featured !== undefined) query.featured = featured === 'true';

    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('addedBy', 'username');

    const count = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
};

// Add movie to database (Admin only)
export const addMovie = async (req, res) => {
  try {
    const movieData = {
      ...req.body,
      addedBy: req.user._id
    };

    const movie = await Movie.create(movieData);
    res.status(201).json(movie);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Movie already exists in database' });
    }
    res.status(500).json({ message: 'Error adding movie', error: error.message });
  }
};

// Update movie (Admin only)
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error: error.message });
  }
};

// Delete movie (Admin only)
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error: error.message });
  }
};

// Toggle featured status (Admin only)
export const toggleFeatured = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movie.featured = !movie.featured;
    await movie.save();

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling featured', error: error.message });
  }
};
