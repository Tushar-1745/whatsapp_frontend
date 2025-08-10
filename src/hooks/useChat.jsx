// hooks/useChat.js
import { useState, useCallback } from 'react';
import { generateMessageId, markMessagesAsRead } from '../utils/messageUtils';

export const useChat = (initialChats) => {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const selectChat = useCallback((chatId) => {
    setSelectedChatId(chatId);
    
    // Mark messages as read when chat is opened
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.wa_id === chatId
          ? {
              ...chat,
              messages: markMessagesAsRead(chat.messages)
            }
          : chat
      )
    );
  }, []);

  const sendMessage = useCallback((text, chatId = selectedChatId) => {
    if (!text.trim() || !chatId) return;

    const newMessage = {
      id: generateMessageId(),
      text: text.trim(),
      timestamp: Date.now(),
      status: 'sent',
      fromMe: true,
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.wa_id === chatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    // Simulate message delivery
    setTimeout(() => {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.wa_id === chatId
            ? {
                ...chat,
                messages: chat.messages.map(msg =>
                  msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
                )
              }
            : chat
        )
      );
    }, 2000);

    // Simulate message read
    setTimeout(() => {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.wa_id === chatId
            ? {
                ...chat,
                messages: chat.messages.map(msg =>
                  msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
                )
              }
            : chat
        )
      );
    }, 5000);
  }, [selectedChatId]);

  const selectedChat = chats.find(chat => chat.wa_id === selectedChatId);

  return {
    chats,
    selectedChat,
    selectedChatId,
    selectChat,
    sendMessage,
    setChats
  };
};
