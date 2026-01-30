import express from 'express';
import {
  getReviews,
  addReview,
  addReply,
  toggleLike,
  deleteReview,
  getAllReviews,
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/:type/:tmdbId', getReviews);
router.post('/', protect, addReview);
router.post('/:reviewId/reply', protect, addReply);
router.post('/:reviewId/like', protect, toggleLike);
router.delete('/:reviewId', protect, deleteReview);

router.get('/', protect, admin, getAllReviews);

export default router;
