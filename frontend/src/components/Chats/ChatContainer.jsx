import { useEffect, useRef } from "react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import "./ChatContainer.css";
import { DEFAULT_AVATAR } from "../../constants/urls";

const ChatContainer = ({ onMenuClick }) => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="chat-container">
        <ChatHeader onMenuClick={onMenuClick} />
        <div className="messages-container">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatHeader onMenuClick={onMenuClick} />

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message ${
              message.senderId === authUser?._id ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="message-image"
                  title="chat-user-avatar"
                />
              )}
              {message.text && (
                <div className="message-text">{message.text}</div>
              )}
              <div className="message-time">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <img
              src={
                message.senderId === authUser?._id
                  ? authUser.profile_picture || `${DEFAULT_AVATAR}`
                  : selectedUser.profile_picture || `${DEFAULT_AVATAR}`
              }
              alt="profile"
              className="message-avatar"
              title="chat-user-message-avatar"
            />
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
