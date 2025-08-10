// components/MessageBubble.jsx
import React from 'react';
import MessageStatus from './MessageStatus';

const MessageBubble = ({ message }) => {
  const isFromMe = message.fromMe;
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const styles = {
    container: {
      display: 'flex',
      marginBottom: '8px',
      justifyContent: isFromMe ? 'flex-end' : 'flex-start'
    },
    bubble: {
      maxWidth: '85%',
      padding: '8px 12px',
      borderRadius: '8px',
      position: 'relative',
      fontSize: '14px',
      backgroundColor: isFromMe ? '#10b981' : '#ffffff',
      color: isFromMe ? '#ffffff' : '#1f2937',
      borderBottomRightRadius: isFromMe ? '0' : '8px',
      borderBottomLeftRadius: isFromMe ? '8px' : '0',
      boxShadow: isFromMe ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    text: {
      lineHeight: '1.625',
      wordBreak: 'break-words'
    },
    timeContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: '4px',
      fontSize: '12px',
      color: isFromMe ? '#dcfce7' : '#6b7280'
    },
    time: {
      marginRight: '4px'
    }
  };

  // Media queries for responsive design
  const mediaQueries = `
    @media (min-width: 640px) {
      .message-bubble {
        max-width: 20rem;
      }
    }
    @media (min-width: 1024px) {
      .message-bubble {
        max-width: 28rem;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueries}</style>
      <div style={styles.container}>
        <div 
          style={styles.bubble}
          className="message-bubble"
        >
          <p style={styles.text}>{message.text}</p>
          <div style={styles.timeContainer}>
            <span style={styles.time}>{time}</span>
            {isFromMe && <MessageStatus status={message.status} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBubble;