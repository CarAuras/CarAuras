const User = require("../../../models/users/userSchema");
const {
  successResponse,
  conflictResponse,
} = require("../../utils/responseHelpers");
const { createSecretToken } = require("../../utils/utils");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      res.status(409).send(conflictResponse());
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ ...req.body, password: hashedPassword });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    const data = { user };
    res.status(200).json(successResponse(data));

    next();
  } catch (error) {
    console.error("Signup error:", error);
    return error;
  }
};
