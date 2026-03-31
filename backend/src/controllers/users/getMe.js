const User = require("../../../models/users/userSchema");
const jwt = require("jsonwebtoken");

module.exports.getMe = (req, res) => {
  // const token = req.body.token || req.cookies.token;
  const token =
    req.header["Authorization"] || req.body.token || req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(
    token,
    process.env.TOKEN_KEY || "something secret",
    async (err, data) => {
      if (err) {
        return res.json({ status: false });
      } else {
        const user = await User.findById(data.id);

        if (user)
          return res.json({
            success: true,
            user: user.firstName,
            userId: user._id,
            user,
          });
        else return res.json({ status: false });
      }
    }
  );
};
