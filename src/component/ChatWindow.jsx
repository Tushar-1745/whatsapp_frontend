// components/ChatWindow.jsx
import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const ChatWindow = ({ chat, onSendMessage, onBackClick, onMenuClick, isVisible }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const styles = {
    container: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh', // Ensure full viewport height
      ...(isVisible 
        ? { display: 'flex' }
        : {
            display: 'none',
            '@media (min-width: 1024px)': {
              display: 'flex'
            }
          }
      )
    },
    messagesContainer: {
      flex: '1',
      overflowY: 'auto',
      padding: '8px',
      minHeight: '0', // Important for flex child to shrink
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end', // Align messages to bottom
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5ddd5' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    inputContainer: {
      flexShrink: 0, // Prevent the input from shrinking
    },
    emptyState: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: '#6b7280',
      padding: '0 16px'
    },
    emptyStateContent: {
      textAlign: 'center'
    },
    emptyStateIcon: {
      width: '48px',
      height: '48px',
      backgroundColor: '#e5e7eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto'
    },
    emptyStateText: {
      fontSize: '14px'
    }
  };

  // Media queries for responsive design
  const mediaQueries = `
    @media (min-width: 640px) {
      .messages-container {
        padding: 16px;
      }
      .empty-state-icon {
        width: 64px;
        height: 64px;
      }
      .empty-state-text {
        font-size: 16px;
      }
    }
    @media (min-width: 1024px) {
      .chat-window-hidden {
        display: flex !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueries}</style>
      <div 
        style={styles.container}
        className={!isVisible ? 'chat-window-hidden' : ''}
      >
        <ChatHeader chat={chat} onBackClick={onBackClick} onMenuClick={onMenuClick} />
        
        <div 
          style={styles.messagesContainer}
          className="messages-container"
        >
          {chat.messages.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateContent}>
                <div style={styles.emptyStateIcon} className="empty-state-icon">
                  <Send style={{ width: '24px', height: '24px', color: '#9ca3af' }} />
                </div>
                <p style={styles.emptyStateText} className="empty-state-text">
                  No messages yet. Start a conversation!
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {chat.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div style={styles.inputContainer}>
          <MessageInput onSend={onSendMessage} />
        </div>
      </div>
    </>
  );
};

export default ChatWindow;