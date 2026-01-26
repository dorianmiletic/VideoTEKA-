import express from 'express';
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/favorites', getFavorites);
router.post('/favorites', addToFavorites);
router.delete('/favorites/:tmdbId', removeFromFavorites);

router.get('/watchlist', getWatchlist);
router.post('/watchlist', addToWatchlist);
router.delete('/watchlist/:tmdbId', removeFromWatchlist);

export default router;
