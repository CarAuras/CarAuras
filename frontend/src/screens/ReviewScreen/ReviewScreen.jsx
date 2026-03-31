import React, { useContext, useEffect, useState } from "react";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Verified as VerifiedIcon,
  ChevronLeft,
  ChevronRight,
  FilterAlt as FilterIcon,
  SentimentVerySatisfied,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
  ThumbUp,
  Comment,
  Share,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import "./ReviewScreen.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Rating, TextField, IconButton } from "@mui/material";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";
import { ADD_REVIEWS_URL, GET_REVIEWS_URL } from "../../config/api";
import Swal from "sweetalert2";
import Ratings from "../../components/Rating/Rating";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: "var(--shadow-lg)",
  p: 4,
};

const ReviewScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const [statCounts, setStatsCount] = useState({
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  });
  const [likedReviews, setLikedReviews] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      let url = GET_REVIEWS_URL;
      if (currentReview !== null) {
        url += `?rating=${currentReview}`;
      }
      const res = await axios.get(url);
      if (res && res.data && res.data.ratings) {
        setReviews(res.data.ratings);
        setStatsCount(res.data.stats);
        setAvg(res.data.avg);
      }
    };
    fetchReviews();
  }, [currentReview]);

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(activeTab));

  const reviewsPerPage = 4;
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const getSentimentIcon = (rating) => {
    switch (rating) {
      case 5:
        return <SentimentVerySatisfied className="sentiment-icon excellent" />;
      case 4:
        return <SentimentSatisfied className="sentiment-icon good" />;
      case 3:
        return <SentimentNeutral className="sentiment-icon average" />;
      case 2:
        return <SentimentDissatisfied className="sentiment-icon poor" />;
      case 1:
        return <SentimentVeryDissatisfied className="sentiment-icon bad" />;
      default:
        return <SentimentNeutral className="sentiment-icon" />;
    }
  };

  const handleSubmit = async (e) => {
    if (user) {
      setLoading(true);
      e.preventDefault();
      let userRating = {
        userId: user._id,
        rating,
        reviewText,
      };
      const res = await axios.post(ADD_REVIEWS_URL, userRating);
      setLoading(false);
      if (res && res.status == 200) {
        handleClose();
        Swal.fire({
          title: "Thank you!",
          text: "Your review has been submitted successfully",
          icon: "success",
          confirmButtonColor: "var(--primary)",
          background: "var(--white)",
        });
      }
      setRating(0);
      setReviewText("");
    }
  };

  const handleLike = (reviewId) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const getRatingPercentage = (ratingValue) => {
    const count = reviews.filter((r) => r.rating === ratingValue).length;
    return (count / reviews.length) * 100;
  };

  return (
    <div className="review-screen">
      <div className="review-header">
        <div className="header-badge">
          <span className="badge-text">Real Reviews</span>
        </div>
        <h1>
          What Our Customers <span className="highlight">Say</span>
        </h1>
        <p>
          Join thousands of satisfied customers who found their perfect car with
          CarAuras
        </p>
      </div>

      <div className="review-stats-container">
        <div className="average-rating-card">
          <div className="rating-summary">
            <div className="rating-score">
              <div className="score-circle">
                <span className="score-value">{avg.toFixed(1)}</span>
                <span className="score-max">/5</span>
              </div>
              <div className="stars-large">
                <Ratings rating={Math.round(avg)} />
              </div>
              <span className="total-reviews">
                {reviews.length} verified reviews
              </span>
            </div>
            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map((ratingValue) => {
                const percentage = getRatingPercentage(ratingValue);
                return (
                  <div key={ratingValue} className="rating-bar-item">
                    <span className="rating-star-label">{ratingValue} ★</span>
                    <div className="bar-track">
                      <div
                        className="bar-progress"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="rating-percentage">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="review-actions-container">
        <button className="add-review-btn" onClick={handleOpen}>
          <EditIcon className="btn-icon" />
          Write a Review
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <>
              <div className="modal-header">
                <Typography variant="h6" component="h2" className="modal-title">
                  Share Your Experience
                </Typography>
                <IconButton onClick={handleClose} className="modal-close">
                  <CloseIcon />
                </IconButton>
              </div>
              {!user ? (
                <div className="auth-required-message">
                  <span>You need to create an account to add a review</span>
                  <button
                    className="login-redirect-btn"
                    onClick={() => (window.location.href = "/signin")}
                  >
                    Sign In Now
                  </button>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <Box mb={3} className="rating-input">
                      <Rating
                        name="review-rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        size="large"
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#FFB800",
                          },
                          "& .MuiRating-iconHover": {
                            color: "#FFB800",
                          },
                        }}
                      />
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Tell us about your experience with the car..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="review-textarea"
                      sx={{ mb: 3 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={!rating || !reviewText || loading}
                      className="submit-review-btn"
                    >
                      {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                  </form>
                </>
              )}
            </>
          </Box>
        </Modal>

        <div className="filter-tabs-container">
          <button
            className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("all");
              setCurrentPage(1);
            }}
          >
            <FilterIcon className="tab-icon" />
            All
          </button>
          {[5, 4, 3, 2, 1].map((ratingValue) => (
            <button
              key={ratingValue}
              className={`filter-tab ${
                activeTab === ratingValue.toString() ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab(ratingValue.toString());
                setCurrentPage(1);
              }}
            >
              {getSentimentIcon(ratingValue)}
              {ratingValue}
            </button>
          ))}
        </div>
      </div>

      <div className="review-list">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <div className="avatar-wrapper">
                    <div className="avatar">{review.name.charAt(0)}</div>
                    {review.verified && (
                      <div className="verified-dot">
                        <VerifiedIcon className="verified-icon-small" />
                      </div>
                    )}
                  </div>
                  <div className="reviewer-details">
                    <h3>{review.name}</h3>
                    <div className="review-meta">
                      <span className="review-date">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {review.car && (
                        <>
                          <span className="meta-separator">•</span>
                          <span className="car-model">{review.car}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="rating-badge">
                  <div className="stars-small">
                    <Ratings rating={review.rating} />
                  </div>
                  <span className="rating-number">{review.rating}.0</span>
                </div>
              </div>

              <div className="review-content">
                <p className="review-text">{review.reviewText}</p>
              </div>

              <div className="review-footer">
                <button
                  className={`action-button like-button ${
                    likedReviews[review.id] ? "liked" : ""
                  }`}
                  onClick={() => handleLike(review.id)}
                >
                  <ThumbUp className="action-icon" />
                  <span>{likedReviews[review.id] ? "Liked" : "Like"}</span>
                </button>
                <button className="action-button">
                  <Comment className="action-icon" />
                  <span>Reply</span>
                </button>
                <button className="action-button">
                  <Share className="action-icon" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-reviews-message">
            <div className="empty-state">
              <SentimentNeutral className="empty-icon" />
              <h3>No reviews yet</h3>
              <p>Be the first to share your experience</p>
              <button className="write-first-btn" onClick={handleOpen}>
                Write a Review
              </button>
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="pagination-button prev-next"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="pagination-icon" />
          </button>

          <div className="page-numbers">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`pagination-button page-number ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className="pagination-button prev-next"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="pagination-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewScreen;
