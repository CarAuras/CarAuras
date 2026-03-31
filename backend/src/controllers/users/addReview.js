const Review = require("../../../models/users/reviewSchema");

module.exports.addReview = async (req, res) => {
  try {
    const { userId, rating, reviewText } = req.body;

    if (!userId || !rating || !reviewText) {
      res.send({ message: "All fields required" });
    }
    const resp = await Review.create(req.body);

    res.status(200).send({ message: "Rating added" });
  } catch (error) {
    return error;
  }
};
