const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    rating: { type: Number, default: 0 },
    reviewText: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
