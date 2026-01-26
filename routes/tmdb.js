import express from 'express';
import {
  getTrending,
  search,
  getDetails,
  getPopular,
  getTopRated,
  getNowPlaying,
  getUpcoming,
  getGenres,
  discover
} from '../controllers/tmdbController.js';

const router = express.Router();

router.get('/trending/:mediaType/:timeWindow', getTrending);
router.get('/search', search);
router.get('/details/:type/:id', getDetails);
router.get('/popular', getPopular);
router.get('/top-rated', getTopRated);
router.get('/now-playing', getNowPlaying);
router.get('/upcoming', getUpcoming);
router.get('/genres', getGenres);
router.get('/discover', discover);

export default router;
