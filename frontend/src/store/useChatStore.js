import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
const token = localStorage.getItem("token");
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/v1/user/message/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/v1/user/message/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/api/v1/user/message/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messages: [...messages, res.data] });
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit("sendMessage", {
          message: res.data,
          receiverId: selectedUser._id,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");

    const messageHandler = (newMessage) => {
      const currentMessages = get().messages;

      const isRelevantMessage =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;

      if (isRelevantMessage) {
        const messageExists = currentMessages.some(
          (msg) => msg._id === newMessage._id
        );
        if (!messageExists) {
          set({ messages: [...currentMessages, newMessage] });
        }
      }
    };

    socket.on("newMessage", messageHandler);

    return () => {
      socket.off("newMessage", messageHandler);
    };
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
