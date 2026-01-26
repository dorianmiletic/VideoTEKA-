import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['movie', 'tv'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000
  },
  replies: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

reviewSchema.index({ tmdbId: 1, type: 1 });
reviewSchema.index({ user: 1 });

export default mongoose.model('Review', reviewSchema);
