const Feedback = require("../../../models/users/FeedbackSchema");
const { sendEmail } = require("../../utils/utils");

module.exports.sentFeedback = async (req, res) => {
  try {
    const { email, subject } = req.body;

    let htmlContent = `<p>New feedback received</p>`;
    await Feedback.create(req.body).then(async () => {
      await sendEmail(
        email,
        "Need feedback received",
        subject,
        htmlContent,
        process.env.EMAIL_USER
      );
      res.status(200).send({ message: "Feedback sent" });
    });
  } catch (error) {
    return error;
  }
};
