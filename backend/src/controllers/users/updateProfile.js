const { cloudinary } = require("../../../config/cloudinary");
const User = require("../../../models/users/userSchema");

module.exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.body.profile_picture) {
      const image = await cloudinary.uploader.upload(req.body.profile_picture, {
        upload_preset: "cloudinary_react",
        public_id: `${Date.now()}_additional`,
      });
      req.body.profile_picture = image?.url;
    }

    await User.updateOne({ _id: userId }, { $set: req.body });
    res.json({ success: true });
  } catch (error) {
    return error;
  }
};
