// components/ChatItem.jsx
import React from 'react';

const ChatItem = ({ chat, isSelected, onClick }) => {
  const lastMsg = chat.messages[chat.messages.length - 1];
  const time = lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }) : '';
  
  const unreadCount = chat.messages.filter(msg => !msg.fromMe && msg.status !== 'read').length;

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 12px', // py-3 px-3
      cursor: 'pointer',
      borderBottom: '1px solid #f3f4f6', // border-b border-gray-100
      backgroundColor: isSelected ? '#f3f4f6' : 'white', // conditional bg
      transition: 'background-color 0.2s ease'
    },
    avatar: {
      width: '40px', // w-10
      height: '40px', // h-10
      borderRadius: '50%', // rounded-full
      backgroundColor: '#d1d5db', // bg-gray-300
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '600', // font-semibold
      marginRight: '12px', // mr-3
      flexShrink: 0 // flex-shrink-0
    },
    avatarText: {
      fontSize: '14px' // text-sm
    },
    content: {
      flex: 1, // flex-1
      minWidth: 0 // min-w-0 for text truncation
    },
    topRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '4px'
    },
    chatName: {
      fontWeight: '600', // font-semibold
      color: '#111827', // text-gray-900
      fontSize: '14px', // text-sm
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis', // truncate
      flex: 1
    },
    time: {
      fontSize: '12px', // text-xs
      color: '#6b7280', // text-gray-500
      marginLeft: '8px', // ml-2
      flexShrink: 0 // flex-shrink-0
    },
    bottomRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    lastMessage: {
      fontSize: '12px', // text-xs
      color: '#4b5563', // text-gray-600
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis', // truncate
      flex: 1 // flex-1
    },
    unreadBadge: {
      marginLeft: '8px', // ml-2
      backgroundColor: '#10b981', // bg-green-500
      color: 'white',
      fontSize: '12px', // text-xs
      borderRadius: '50%', // rounded-full
      width: '20px', // w-5
      height: '20px', // h-5
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0 // flex-shrink-0
    }
  };

  // Get responsive styles based on screen size
  const getResponsiveStyles = () => {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 640) { // sm screens and up
      return {
        ...styles,
        container: {
          ...styles.container,
          padding: '12px 16px' // sm:px-4
        },
        avatar: {
          ...styles.avatar,
          width: '48px', // sm:w-12
          height: '48px' // sm:h-12
        },
        avatarText: {
          ...styles.avatarText,
          fontSize: '16px' // sm:text-base
        },
        chatName: {
          ...styles.chatName,
          fontSize: '16px' // sm:text-base
        },
        lastMessage: {
          ...styles.lastMessage,
          fontSize: '14px' // sm:text-sm
        }
      };
    }
    
    return styles; // Mobile styles (default)
  };

  const responsiveStyles = getResponsiveStyles();

  // Hover effect handler
  const handleMouseEnter = (e) => {
    if (!isSelected) {
      e.currentTarget.style.backgroundColor = '#f9fafb'; // hover:bg-gray-50
    }
  };

  const handleMouseLeave = (e) => {
    if (!isSelected) {
      e.currentTarget.style.backgroundColor = 'white';
    }
  };

  return (
    <div
      onClick={onClick}
      style={responsiveStyles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={responsiveStyles.avatar}>
        <span style={responsiveStyles.avatarText}>
          {chat.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div style={responsiveStyles.content}>
        <div style={responsiveStyles.topRow}>
          <h3 style={responsiveStyles.chatName}>{chat.name}</h3>
          <span style={responsiveStyles.time}>{time}</span>
        </div>
        <div style={responsiveStyles.bottomRow}>
          <p style={responsiveStyles.lastMessage}>
            {lastMsg ? (lastMsg.fromMe ? '✓ ' : '') + lastMsg.text : 'No messages yet'}
          </p>
          {unreadCount > 0 && (
            <span style={responsiveStyles.unreadBadge}>
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;