require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users/userSchema");
module.exports.userVerification = (req, res, next) => {
  const token =
    req.headers["authorization"]?.split(" ")[1] ||
    req.body.token ||
    req.cookies.token;

  if (!token) {
    return res.json({ status: 403, message: "Forebidden" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        req.user = user;
        req.userId = user._id;
        next();
      } else {
        return res.json({ status: false });
      }
    }
  });
};
