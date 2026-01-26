import express from 'express';
import {
  getReviews,
  addReview,
  addReply,
  toggleLike,
  deleteReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:type/:tmdbId', getReviews);
router.post('/', protect, addReview);
router.post('/:reviewId/reply', protect, addReply);
router.post('/:reviewId/like', protect, toggleLike);
router.delete('/:reviewId', protect, deleteReview);

export default router;
