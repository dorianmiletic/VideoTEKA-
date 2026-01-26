import express from 'express';
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  toggleFeatured
} from '../controllers/movieController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMovies);
router.post('/', protect, admin, addMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);
router.patch('/:id/featured', protect, admin, toggleFeatured);

export default router;
