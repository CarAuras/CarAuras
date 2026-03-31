const User = require("../../../models/users/userSchema");
const crypto = require("crypto");
const { sendEmail } = require("../../utils/utils");
const { emailSubjects } = require("../../../constants/templates");
require("dotenv").config();

const productionSiteUrl = process.env.WEBSITE_LIVE_URL;
const localSiteUrl = process.env.WEBSITE_LOCAL_URL;

const applicationUrl =
  process.env.NODE_ENV == "production" ? productionSiteUrl : localSiteUrl;

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).send({ message: "User not found" });
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 10;
  await user.save();

  const resetPasswordLink = `${applicationUrl}/reset-password/${resetToken}`;

  let htmlContent = `<p>You requested to reset your password. Click <a href=${resetPasswordLink}>here</a> to reset.</p>`;
  await sendEmail(
    process.env.EMAIL_USER,
    emailSubjects.PASSWORD_RESET,
    emailSubjects.PASSWORD_RESET,
    htmlContent,
    email
  );
  res.status(200).json({ message: "Password reset link sent to your email." });
};
