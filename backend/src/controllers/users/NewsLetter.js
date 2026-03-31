const NewsLetter = require("../../../models/users/newLetterSubscription");

module.exports.NewsLetter = async (req, res) => {
  try {
    const { email } = req.body;
    const isAlreadySubscribed = await NewsLetter.findOne({ email });
    if (isAlreadySubscribed) {
      res.status(409).send({ message: "User already subscribed" });
    } else {
      await NewsLetter.create(req.body);
      res.status(200).send({ message: "News letter subscription added" });
    }
  } catch (error) {
    return error;
  }
};
