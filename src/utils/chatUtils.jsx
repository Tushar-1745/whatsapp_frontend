// utils/chatUtils.js
export const searchChats = (chats, searchTerm) => {
  if (!searchTerm.trim()) return chats;
  
  return chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

export const sortChatsByLastMessage = (chats) => {
  return [...chats].sort((a, b) => {
    const lastMsgA = a.messages[a.messages.length - 1];
    const lastMsgB = b.messages[b.messages.length - 1];
    
    if (!lastMsgA && !lastMsgB) return 0;
    if (!lastMsgA) return 1;
    if (!lastMsgB) return -1;
    
    return lastMsgB.timestamp - lastMsgA.timestamp;
  });
};

export const getChatById = (chats, chatId) => {
  return chats.find(chat => chat.wa_id === chatId);
};