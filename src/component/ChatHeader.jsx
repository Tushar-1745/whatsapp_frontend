// components/ChatHeader.jsx
import React from 'react';
import { ArrowLeft, Menu, Video, Phone, MoreVertical } from 'lucide-react';

const ChatHeader = ({ chat, onBackClick, onMenuClick }) => {
  const styles = {
    container: {
      backgroundColor: '#f3f4f6', // bg-gray-100
      padding: '12px 12px', // py-3 px-3
      borderBottom: '1px solid #e5e7eb', // border-b border-gray-200
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center'
    },
    backButton: {
      padding: '4px', // p-1
      marginRight: '8px', // mr-2
      color: '#4b5563', // text-gray-600
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '4px',
      display: 'block' // Will be hidden on lg screens
    },
    menuButton: {
      padding: '4px', // p-1
      marginRight: '8px', // mr-2
      color: '#4b5563', // text-gray-600
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '4px',
      display: 'none' // Will be shown on sm but hidden on lg
    },
    avatar: {
      width: '32px', // w-8
      height: '32px', // h-8
      borderRadius: '50%', // rounded-full
      backgroundColor: '#d1d5db', // bg-gray-300
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '600', // font-semibold
      marginRight: '12px' // mr-3
    },
    avatarText: {
      fontSize: '14px' // text-sm
    },
    chatInfo: {
      minWidth: 0, // min-w-0 for text truncation
      flex: 1
    },
    chatName: {
      fontWeight: '600', // font-semibold
      color: '#111827', // text-gray-900
      fontSize: '14px', // text-sm
      margin: '0 0 2px 0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis' // truncate
    },
    lastSeen: {
      fontSize: '12px', // text-xs
      color: '#4b5563', // text-gray-600
      margin: 0
    },
    rightSection: {
      display: 'flex',
      gap: '8px', // space-x-2
      color: '#4b5563', // text-gray-600
      flexShrink: 0 // flex-shrink-0
    },
    actionIcon: {
      width: '20px', // w-5
      height: '20px', // h-5
      cursor: 'pointer'
    }
  };

  // Get responsive styles based on screen size
  const getResponsiveStyles = () => {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 1024) { // lg screens
      return {
        ...styles,
        container: { 
          ...styles.container, 
          padding: '12px 16px' // sm:px-4
        },
        backButton: { ...styles.backButton, display: 'none' }, // lg:hidden
        menuButton: { ...styles.menuButton, display: 'none' }, // lg:hidden
        avatar: { 
          ...styles.avatar, 
          width: '40px', // sm:w-10
          height: '40px' // sm:h-10
        },
        avatarText: { ...styles.avatarText, fontSize: '16px' }, // sm:text-base
        chatName: { ...styles.chatName, fontSize: '16px' }, // sm:text-base
        lastSeen: { ...styles.lastSeen, fontSize: '14px' }, // sm:text-sm
        rightSection: { ...styles.rightSection, gap: '16px' } // sm:space-x-4
      };
    } else if (screenWidth >= 640) { // sm screens
      return {
        ...styles,
        container: { 
          ...styles.container, 
          padding: '12px 16px' // sm:px-4
        },
        backButton: { ...styles.backButton, display: 'none' }, // hidden on sm+
        menuButton: { ...styles.menuButton, display: 'block' }, // sm:block lg:hidden
        avatar: { 
          ...styles.avatar, 
          width: '40px', // sm:w-10
          height: '40px' // sm:h-10
        },
        avatarText: { ...styles.avatarText, fontSize: '16px' }, // sm:text-base
        chatName: { ...styles.chatName, fontSize: '16px' }, // sm:text-base
        lastSeen: { ...styles.lastSeen, fontSize: '14px' }, // sm:text-sm
        rightSection: { ...styles.rightSection, gap: '16px' } // sm:space-x-4
      };
    } else { // mobile screens
      return {
        ...styles,
        backButton: { ...styles.backButton, display: 'block' }, // Show on mobile
        menuButton: { ...styles.menuButton, display: 'none' } // Hide on mobile
      };
    }
  };

  const responsiveStyles = getResponsiveStyles();

  // Hover effect handler
  const handleMouseOver = (e) => {
    e.target.style.color = '#1f2937'; // hover:text-gray-800
  };

  const handleMouseOut = (e) => {
    e.target.style.color = '#4b5563'; // text-gray-600
  };

  return (
    <div style={responsiveStyles.container}>
      <div style={responsiveStyles.leftSection}>
        <button
          onClick={onBackClick}
          style={responsiveStyles.backButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <ArrowLeft style={{ width: '20px', height: '20px' }} />
        </button>
        <button
          onClick={onMenuClick}
          style={responsiveStyles.menuButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Menu style={{ width: '20px', height: '20px' }} />
        </button>
        <div style={responsiveStyles.avatar}>
          <span style={responsiveStyles.avatarText}>
            {chat.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div style={responsiveStyles.chatInfo}>
          <h2 style={responsiveStyles.chatName}>{chat.name}</h2>
          <p style={responsiveStyles.lastSeen}>last seen today at 12:30</p>
        </div>
      </div>
      <div style={responsiveStyles.rightSection}>
        <Video 
          style={responsiveStyles.actionIcon}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
        <Phone 
          style={responsiveStyles.actionIcon}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
        <MoreVertical 
          style={responsiveStyles.actionIcon}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </div>
    </div>
  );
};

export default ChatHeader;