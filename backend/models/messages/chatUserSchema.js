const mongoose = require("mongoose");
const chatUserSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const ChatUsers = mongoose.model("ChatUsers", chatUserSchema);
module.exports = ChatUsers;
