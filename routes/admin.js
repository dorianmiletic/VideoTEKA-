import express from 'express'
import { protect, admin } from '../middleware/auth.js'
import {
  getAllMovies,
  deleteMovie,
  toggleFeaturedMovie,
  getAllUsers,
  deleteUser,
  getAllReviews,
  deleteReview,
} from '../controllers/adminController.js'

const router = express.Router()

router.use(protect, admin) 

// Movies
router.get('/movies', getAllMovies)
router.delete('/movies/:id', deleteMovie)
router.patch('/movies/:id/featured', toggleFeaturedMovie)

// Users
router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser)

// Reviews
router.get('/reviews', getAllReviews)
router.delete('/reviews/:id', deleteReview)

export default router
