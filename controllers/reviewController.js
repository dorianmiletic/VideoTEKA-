import Review from '../models/Review.js';

// Get all reviews for a movie/TV show
export const getReviews = async (req, res) => {
  try {
    const { tmdbId, type } = req.params;
    
    const reviews = await Review.find({ tmdbId: parseInt(tmdbId), type })
      .populate('user', 'username')
      .populate('replies.user', 'username')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Add a review
export const addReview = async (req, res) => {
  try {
    const { tmdbId, type, rating, comment } = req.body;
    
    // Check if user already reviewed
    const existingReview = await Review.findOne({
      tmdbId: parseInt(tmdbId),
      type,
      user: req.user._id
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'Već ste ostavili recenziju' });
    }
    
    const review = await Review.create({
      tmdbId: parseInt(tmdbId),
      type,
      user: req.user._id,
      rating,
      comment
    });
    
    await review.populate('user', 'username');
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

// Add reply to review
export const addReply = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment } = req.body;
    
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    review.replies.push({
      user: req.user._id,
      comment
    });
    
    await review.save();
    await review.populate('user', 'username');
    await review.populate('replies.user', 'username');
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error: error.message });
  }
};

// Like/unlike review
export const toggleLike = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    const likeIndex = review.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      review.likes.splice(likeIndex, 1);
    } else {
      review.likes.push(req.user._id);
    }
    
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling like', error: error.message });
  }
};

// Delete review (own review only)
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
