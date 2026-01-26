import User from '../models/User.js';

// Add to favorites
export const addToFavorites = async (req, res) => {
  try {
    const { tmdbId, type, title, posterPath } = req.body;
    const user = await User.findById(req.user._id);

    // Check if already in favorites
    const exists = user.favorites.some(fav => fav.tmdbId === tmdbId);
    if (exists) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favorites.push({ tmdbId, type, title, posterPath });
    await user.save();

    res.json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
};

// Remove from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(fav => fav.tmdbId !== parseInt(tmdbId));
    await user.save();

    res.json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error: error.message });
  }
};

// Get user favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

// Add to watchlist
export const addToWatchlist = async (req, res) => {
  try {
    const { tmdbId, type, title, posterPath } = req.body;
    const user = await User.findById(req.user._id);

    const exists = user.watchlist.some(item => item.tmdbId === tmdbId);
    if (exists) {
      return res.status(400).json({ message: 'Already in watchlist' });
    }

    user.watchlist.push({ tmdbId, type, title, posterPath });
    await user.save();

    res.json({ message: 'Added to watchlist', watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to watchlist', error: error.message });
  }
};

// Remove from watchlist
export const removeFromWatchlist = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const user = await User.findById(req.user._id);

    user.watchlist = user.watchlist.filter(item => item.tmdbId !== parseInt(tmdbId));
    await user.save();

    res.json({ message: 'Removed from watchlist', watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from watchlist', error: error.message });
  }
};

// Get user watchlist
export const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching watchlist', error: error.message });
  }
};
