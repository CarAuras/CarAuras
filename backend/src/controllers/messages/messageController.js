const { cloudinary } = require("../../../config/cloudinary");

const User = require("../../../models/users/userSchema");

const Message = require("../../../models/messages/messageSchema");
const { getReceiverSocketId, io } = require("../../../libs/socket");
const ChatUsers = require("../../../models/messages/chatUserSchema");

module.exports.addChatUser = async (req, res) => {
  try {
    const senderId = req.user._id;

    const receiverId = req.body.receiverId;
    const isChatExist = await ChatUsers.findOne({ senderId, receiverId });
    if (!isChatExist) {
      await ChatUsers.create({ senderId, receiverId });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const chatUsers = await ChatUsers.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const userIds = chatUsers.map((chat) =>
      chat.senderId.toString() === loggedInUserId.toString()
        ? chat.receiverId
        : chat.senderId
    );

    const users = await User.find({
      _id: { $in: userIds },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const userSocketMap = {};
module.exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) {
      console.log(`Emitting to sender ${senderId} on socket ${senderSocketId}`);
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
