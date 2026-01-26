import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  originalTitle: String,
  overview: String,
  releaseDate: Date,
  posterPath: String,
  backdropPath: String,
  voteAverage: Number,
  voteCount: Number,
  popularity: Number,
  genres: [String],
  runtime: Number,
  status: String,
  tagline: String,
  type: {
    type: String,
    enum: ['movie', 'tv'],
    default: 'movie'
  },
  featured: {
    type: Boolean,
    default: false
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

movieSchema.index({ title: 'text', overview: 'text' });
movieSchema.index({ tmdbId: 1 });

export default mongoose.model('Movie', movieSchema);
