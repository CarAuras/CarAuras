import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import "./ChatHeader.css";
import { DEFAULT_AVATAR } from "../../constants/urls";
import WestIcon from "@mui/icons-material/West";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <WestIcon onClick={() => setSelectedUser(null)} />
        <div className="chat-header-avatar">
          <img
            src={selectedUser.profilePic || `${DEFAULT_AVATAR}`}
            alt={selectedUser.username}
            title="chat-user-header-im"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="online-indicator" />
          )}
        </div>
        <div className="chat-header-info">
          <h3 className="user-name">{selectedUser.username}</h3>
          <p className="user-status">
            {onlineUsers.includes(selectedUser._id) ? (
              <span className="online">Online</span>
            ) : (
              <span className="offline">Offline</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
