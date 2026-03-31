const Review = require("../../../models/users/reviewSchema");

module.exports.getReviews = async (req, res) => {
  try {
    const { rating } = req.query;

    const allReviews = await Review.find().populate("userId");

    const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;

    allReviews.forEach((review) => {
      const rate = review.rating;
      if (stats[rate] !== undefined) {
        stats[rate] += 1;
        totalRating += rate;
      }
    });

    const avg = allReviews.length
      ? parseFloat((totalRating / allReviews.length).toFixed(1))
      : 0;

    const filteredReviews =
      rating && !isNaN(rating)
        ? allReviews.filter((r) => r.rating === Number(rating))
        : allReviews;

    const transformed = filteredReviews.map((review) => ({
      _id: review._id,
      name: `${review?.userId?.username ?? "_"}`,
      rating: review.rating,
      date: new Date(review.createdAt).toISOString().split("T")[0],
      reviewText: review.reviewText,
      verified: review?.userId?.verified ?? false,
    }));

    res.send({
      avg,
      stats,
      ratings: transformed,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
