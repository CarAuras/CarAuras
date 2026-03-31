const User = require("../../../models/users/userSchema");

module.exports.findExpiredUsers = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const users = await User.find({
      subscription_expires_at: { $gte: startOfDay, $lte: endOfDay },
    }).select({ email: 1, username: 1 });

    return users;
  } catch (error) {
    return error;
  }
};
