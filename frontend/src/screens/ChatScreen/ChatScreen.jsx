import React from "react";
import "./ChatScreen.css";
import { useChatStore } from "../../store/useChatStore";
import Sidebar from "../../components/Chats/Sidebar";
import NoChatSelected from "../../components/Chats/NoChatSelected";
import ChatContainer from "../../components/Chats/ChatContainer";

function ChatScreen() {
  const { selectedUser } = useChatStore();
  const [showSidebar, setShowSidebar] = React.useState(true);

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleMenuClick = () => {
    setShowSidebar(true);
  };

  return (
    <div className="chat-screen">
      {(!selectedUser || showSidebar) && (
        <div className={`sidebar ${selectedUser ? "mobile-hidden" : ""}`}>
          <Sidebar onClose={handleCloseSidebar} />
        </div>
      )}
      <div className="chat-content">
        {!selectedUser ? (
          <NoChatSelected />
        ) : (
          <ChatContainer onMenuClick={handleMenuClick} />
        )}
      </div>
    </div>
  );
}

export default ChatScreen;
