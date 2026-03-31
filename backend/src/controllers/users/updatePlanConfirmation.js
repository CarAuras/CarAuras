const {
  subscriptionConfirmationEmail,
} = require("../../../email-templates/subsription-confirmation-email");
const User = require("../../../models/users/userSchema");
const { sendEmail } = require("../../utils/utils");

module.exports.updatePlanConfirmation = async (req, res) => {
  try {
    const dealerId = req.params.id;
    const plan = req.body.plan ?? "Free";

    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    const formattedDate = nextMonthDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const user = await User.findOne({ _id: dealerId });
    if (user) {
      const htmlContent = subscriptionConfirmationEmail(
        user.username,
        plan,
        formattedDate
      );
      const from = user.email;
      const subject = `Your ${plan} confirmation Email`;
      await sendEmail(
        from,
        subject,
        "Your subscription plan is expiring today. Please visit https://carauras.com/premium-plans to renew.",
        htmlContent,
        user.email
      );
      res.status(200).send({ message: "Subscribed" });
    } else {
      res.status(404).send({ message: "User not found!" });
    }
  } catch (error) {
    console.log("Error while confirming plan : ", error);
    return error;
  }
};
