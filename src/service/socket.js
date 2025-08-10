// frontend/src/services/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.eventListeners = new Map();
  }

  // Initialize socket connection
  connect() {
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return;
    }

    console.log('Connecting to socket server:', SOCKET_URL);

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      maxReconnectionAttempts: this.maxReconnectAttempts,
    });

    this.setupEventListeners();
  }

  // Setup default socket event listeners
  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit('connection-status', { connected: true });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      this.isConnected = false;
      this.emit('connection-status', { connected: false, reason });
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('Socket reconnected after', attemptNumber, 'attempts');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit('connection-status', { connected: true, reconnected: true });
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('Socket reconnection attempt:', attemptNumber);
      this.reconnectAttempts = attemptNumber;
      this.emit('connection-status', { 
        connected: false, 
        reconnecting: true, 
        attempt: attemptNumber 
      });
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Socket reconnection failed after maximum attempts');
      this.emit('connection-status', { 
        connected: false, 
        reconnectFailed: true 
      });
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.emit('connection-status', { 
        connected: false, 
        error: error.message 
      });
    });

    // WhatsApp-specific events
    this.socket.on('new-message', (message) => {
      console.log('New message received:', message);
      this.emit('new-message', message);
    });

    this.socket.on('message-status-updated', (statusUpdate) => {
      console.log('Message status updated:', statusUpdate);
      this.emit('message-status-updated', statusUpdate);
    });

    this.socket.on('conversation-updated', (conversation) => {
      console.log('Conversation updated:', conversation);
      this.emit('conversation-updated', conversation);
    });

    this.socket.on('typing', (data) => {
      this.emit('typing', data);
    });

    this.socket.on('stop-typing', (data) => {
      this.emit('stop-typing', data);
    });
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      console.log('Disconnecting socket...');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.emit('connection-status', { connected: false });
    }
  }

  // Join a specific chat room
  joinChat(wa_id) {
    if (this.socket?.connected) {
      console.log('Joining chat:', wa_id);
      this.socket.emit('join-chat', wa_id);
    } else {
      console.warn('Socket not connected, cannot join chat');
    }
  }

  // Leave a specific chat room
  leaveChat(wa_id) {
    if (this.socket?.connected) {
      console.log('Leaving chat:', wa_id);
      this.socket.emit('leave-chat', wa_id);
    }
  }

  // Send message through socket
  sendMessage(messageData) {
    if (this.socket?.connected) {
      this.socket.emit('send-message', messageData);
    } else {
      console.warn('Socket not connected, cannot send message');
    }
  }

  // Emit typing event
  startTyping(wa_id) {
    if (this.socket?.connected) {
      this.socket.emit('typing', { wa_id });
    }
  }

  // Emit stop typing event
  stopTyping(wa_id) {
    if (this.socket?.connected) {
      this.socket.emit('stop-typing', { wa_id });
    }
  }

  // Generic event listener registration
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  // Remove event listener
  off(event, callback) {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Emit event to registered listeners
  emit(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in socket event listener:', error);
        }
      });
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      connected: this.isConnected,
      socketId: this.socket?.id || null,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  // Manual reconnection attempt
  reconnect() {
    if (this.socket) {
      console.log('Manual reconnection attempt...');
      this.socket.connect();
    } else {
      this.connect();
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;