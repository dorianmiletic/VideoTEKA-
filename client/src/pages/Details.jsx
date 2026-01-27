import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tmdbAPI, userAPI, reviewAPI } from "../services/api";
import { getBackdropUrl, getPosterUrl } from "../utils/imageUrl";
import useAuthStore from "../store/authStore";

const Details = () => {
  const { type, id } = useParams();
  const { isAuthenticated, user } = useAuthStore();
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdbAPI.getDetails(type, id);
        setDetails(response.data);

        // Get trailer
        if (response.data.videos && response.data.videos.results) {
          const youtubeTrailer = response.data.videos.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube",
          );
          setTrailer(youtubeTrailer);
        }

        // Get seasons for TV shows
        if (type === "tv" && response.data.seasons) {
          setSeasons(response.data.seasons);
        }

        // Get reviews
        const reviewsRes = await reviewAPI.getReviews(type, id);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
      if (isAuthenticated) {
        const [favRes, watchRes] = await Promise.all([
          userAPI.getFavorites(),
          userAPI.getWatchlist(),
        ]);

        setIsFavorite(favRes.data.some((item) => item.tmdbId === parseInt(id)));

        setIsInWatchlist(
          watchRes.data.some((item) => item.tmdbId === parseInt(id)),
        );
      }
    };

    fetchData();
  }, [type, id]);

  const handleAddToFavorites = async () => {
    try {
      const title = details.title || details.name;
      await userAPI.addToFavorites({
        tmdbId: parseInt(id),
        type,
        title,
        posterPath: details.poster_path,
      });
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      const title = details.title || details.name;
      await userAPI.addToWatchlist({
        tmdbId: parseInt(id),
        type,
        title,
        posterPath: details.poster_path,
      });
      setIsInWatchlist(true);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await reviewAPI.addReview({
        tmdbId: parseInt(id),
        type,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setReviews([response.data, ...reviews]);
      setShowReviewForm(false);
      setNewReview({ rating: 5, comment: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Error adding review");
    }
  };

  const handleSubmitReply = async (reviewId) => {
    try {
      const response = await reviewAPI.addReply(reviewId, replyText);
      setReviews(reviews.map((r) => (r._id === reviewId ? response.data : r)));
      setReplyTo(null);
      setReplyText("");
    } catch (error) {
      alert("Error adding reply");
    }
  };

  const handleToggleLike = async (reviewId) => {
    try {
      const response = await reviewAPI.toggleLike(reviewId);
      setReviews(reviews.map((r) => (r._id === reviewId ? response.data : r)));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!details) return null;

  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;

  return (
    <div>
      {/* Backdrop */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getBackdropUrl(details.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <img
            src={getPosterUrl(details.poster_path)}
            alt={title}
            className="w-128 rounded-lg shadow-2xl"
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>

            {details.tagline && (
              <p className="text-xl text-gray-400 italic mb-4">
                {details.tagline}
              </p>
            )}

            <div className="flex items-center space-x-6 mb-6 text-sm">
              <span className="bg-primary px-3 py-1 rounded">
                ⭐ {details.vote_average?.toFixed(1)}
              </span>
              {releaseDate && (
                <span>{new Date(releaseDate).getFullYear()}</span>
              )}
              {details.runtime && <span>{details.runtime} min</span>}
              {details.number_of_seasons && (
                <span>{details.number_of_seasons} sezona</span>
              )}
              {details.status && <span>{details.status}</span>}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {details.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Pregled</h2>
              <p className="text-gray-300 leading-relaxed">
                {details.overview}
              </p>
            </div>

            {/* Trailer */}
            {trailer && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">🎬 Trailer</h2>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Actions */}
            {isAuthenticated && (
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleAddToFavorites}
                  disabled={isFavorite}
                  className="bg-primary hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {isFavorite ? "✓ U omiljenim" : "❤ Dodaj u omiljene"}
                </button>
                <button
                  onClick={handleAddToWatchlist}
                  disabled={isInWatchlist}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {isInWatchlist ? "✓ U watchlisti" : "+ Dodaj u watchlist"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* TV Show Seasons */}
        {type === "tv" && seasons.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">📺 Sezone</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {seasons.map((season) => (
                <div key={season.id} className="bg-dark-light p-4 rounded-lg">
                  <img
                    src={getPosterUrl(season.poster_path)}
                    alt={season.name}
                    className="w-full rounded mb-2"
                  />
                  <h3 className="font-bold">{season.name}</h3>
                  <p className="text-sm text-gray-400">
                    {season.episode_count} epizoda
                  </p>
                  {season.air_date && (
                    <p className="text-xs text-gray-500">
                      {new Date(season.air_date).getFullYear()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              💬 Recenzije ({reviews.length})
            </h2>
            {isAuthenticated && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-primary hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                + Dodaj recenziju
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <form
              onSubmit={handleSubmitReview}
              className="bg-dark-light p-6 rounded-lg mb-6"
            >
              <div className="mb-4">
                <label className="block mb-2">
                  Ocjena: {newReview.rating} ⭐
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Napišite vašu recenziju (minimum 10 znakova)..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="4"
                  required
                  minLength="10"
                ></textarea>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-primary hover:bg-red-700 px-6 py-2 rounded-lg transition"
                >
                  Objavi
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition"
                >
                  Odustani
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-dark-light p-6 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-bold text-lg">
                      {review.user.username}
                    </span>
                    <span className="ml-3 text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("hr-HR")}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{review.comment}</p>

                <div className="flex items-center space-x-4 text-sm">
                  {isAuthenticated && (
                    <>
                      <button
                        onClick={() => handleToggleLike(review._id)}
                        className="hover:text-primary transition"
                      >
                        👍 {review.likes.length}
                      </button>
                      <button
                        onClick={() => setReplyTo(review._id)}
                        className="hover:text-primary transition"
                      >
                        💬 Odgovori
                      </button>
                    </>
                  )}
                </div>

                {/* Reply Form */}
                {replyTo === review._id && (
                  <div className="mt-4 ml-8">
                    <textarea
                      placeholder="Vaš odgovor..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                      rows="2"
                    ></textarea>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSubmitReply(review._id)}
                        className="bg-primary hover:bg-red-700 px-4 py-1 rounded transition text-sm"
                      >
                        Pošalji
                      </button>
                      <button
                        onClick={() => {
                          setReplyTo(null);
                          setReplyText("");
                        }}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded transition text-sm"
                      >
                        Odustani
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {review.replies && review.replies.length > 0 && (
                  <div className="mt-4 ml-8 space-y-3">
                    {review.replies.map((reply, idx) => (
                      <div key={idx} className="bg-gray-800 p-3 rounded">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-sm">
                            {reply.user.username}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString(
                              "hr-HR",
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{reply.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {reviews.length === 0 && (
              <p className="text-center text-gray-400 py-8">
                Još nema recenzija. Budite prvi!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
