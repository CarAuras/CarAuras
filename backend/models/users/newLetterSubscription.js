const mongoose = require("mongoose");

const NewsLetterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    subscribed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const NewsLetter = mongoose.model("NewsLetter", NewsLetterSchema);
module.exports = NewsLetter;
