// constants/messages.js
export const MESSAGE_STATUS = {
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
  };
  
  export const MESSAGE_TYPES = {
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    DOCUMENT: 'document',
  };
  
  export const PLACEHOLDER_MESSAGES = {
    EMPTY_CHAT: 'No messages yet. Start a conversation!',
    SEARCH_PLACEHOLDER: 'Search or start new chat',
    TYPE_MESSAGE: 'Type a message',
    LAST_SEEN: 'last seen today at 12:30',
  };
  
  // ============================================================================
  
  // validation/messageValidation.js
  export const validateMessage = (message) => {
    if (!message || typeof message !== 'string') {
      return { isValid: false, error: 'Message must be a non-empty string' };
    }
  
    const trimmed = message.trim();
    
    if (trimmed.length === 0) {
      return { isValid: false, error: 'Message cannot be empty' };
    }
  
    if (trimmed.length > 4096) {
      return { isValid: false, error: 'Message too long (max 4096 characters)' };
    }
  
    return { isValid: true, message: trimmed };
  };
  
  export const sanitizeMessage = (message) => {
    return message
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .trim();
  };