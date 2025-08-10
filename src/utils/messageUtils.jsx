// utils/messageUtils.js
export const generateMessageId = () => {
    return 'm' + Math.random().toString(36).substr(2, 9);
  };
  
  export const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };
  
  export const formatMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  export const getLastMessagePreview = (message) => {
    if (!message) return 'No messages yet';
    
    const preview = message.text.length > 50 
      ? message.text.substring(0, 50) + '...' 
      : message.text;
      
    return message.fromMe ? `✓ ${preview}` : preview;
  };
  
  export const getUnreadCount = (messages) => {
    return messages.filter(msg => !msg.fromMe && msg.status !== 'read').length;
  };
  
  export const markMessagesAsRead = (messages) => {
    return messages.map(msg => ({
      ...msg,
      status: msg.fromMe ? msg.status : 'read'
    }));
  };
  