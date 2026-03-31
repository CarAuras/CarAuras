import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../../store/useChatStore";
import "./MessageInput.css";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="message-input-container">
      {imagePreview && (
        <div className="image-preview">
          <div className="preview-container">
            <img src={imagePreview} alt="Preview" title="message-img" />
            <button
              onClick={removeImage}
              type="button"
              className="preview-close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="message-form">
        <div className="input-wrapper">
          <button
            type="button"
            className="upload-button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="message-input"
          />

          <input
            type="file"
            accept="image/*"
            className="file-input"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="send-button"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
