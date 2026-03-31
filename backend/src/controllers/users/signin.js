const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../../utils/utils");
const User = require("../../../models/users/userSchema");

module.exports.SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    let loggedInUser = user;
    loggedInUser["token"] = token;

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user: loggedInUser,
    });
    next();
  } catch (error) {
    return error;
  }
};
