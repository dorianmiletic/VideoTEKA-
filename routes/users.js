import express from 'express';
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  addToWatched,
  getWatched,
  getAllUsers,
} from '../controllers/userController.js';
import { protect,admin } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/favorites', getFavorites);
router.post('/favorites', addToFavorites);
router.delete('/favorites/:tmdbId', removeFromFavorites);

router.get('/watchlist', getWatchlist);
router.post('/watchlist', addToWatchlist);
router.delete('/watchlist/:tmdbId', removeFromWatchlist);

router.post('/watched', addToWatched); 
router.get('/watched', getWatched);

router.get('/', protect, admin, getAllUsers);

export default router;
