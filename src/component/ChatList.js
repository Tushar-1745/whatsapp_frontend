// components/ChatList.jsx
import React, { useState } from 'react';
import { Search, MoreVertical, ArrowLeft } from 'lucide-react';
import ChatItem from './ChatItem';

const ChatList = ({ chats, selectedChatId, onSelectChat, isVisible, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 50,
      width: '100%',
      backgroundColor: 'white',
      borderRight: '1px solid #e5e7eb', // border-r border-gray-200
      display: 'flex',
      flexDirection: 'column',
      transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)' // duration-300 ease-in-out
    },
    header: {
      backgroundColor: '#f3f4f6', // bg-gray-100
      padding: '12px 12px', // py-3 px-3
      borderBottom: '1px solid #e5e7eb' // border-b border-gray-200
    },
    headerContent: {
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
      display: 'block' // Will be hidden on lg
    },
    avatar: {
      width: '32px', // w-8
      height: '32px', // h-8
      borderRadius: '50%', // rounded-full
      backgroundColor: '#9ca3af', // bg-gray-400
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '600' // font-semibold
    },
    avatarText: {
      fontSize: '14px' // text-sm
    },
    rightSection: {
      display: 'flex',
      gap: '12px', // space-x-3
      color: '#4b5563' // text-gray-600
    },
    actionIcon: {
      width: '20px', // w-5
      height: '20px', // h-5
      cursor: 'pointer'
    },
    searchContainer: {
      padding: '12px', // p-3
      borderBottom: '1px solid #e5e7eb' // border-b border-gray-200
    },
    searchWrapper: {
      position: 'relative'
    },
    searchIcon: {
      width: '16px', // w-4
      height: '16px', // h-4
      position: 'absolute',
      left: '12px', // left-3
      top: '12px', // top-3
      color: '#6b7280' // text-gray-500
    },
    searchInput: {
      width: '100%',
      paddingLeft: '40px', // pl-10
      paddingRight: '16px', // pr-4
      paddingTop: '8px', // py-2
      paddingBottom: '8px',
      backgroundColor: '#f3f4f6', // bg-gray-100
      borderRadius: '8px', // rounded-lg
      border: 'none',
      outline: 'none',
      fontSize: '14px' // text-sm
    },
    chatListContainer: {
      flex: 1, // flex-1
      overflowY: 'auto' // overflow-y-auto
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
          position: 'relative', // lg:relative
          transform: 'translateX(0)', // lg:translate-x-0
          zIndex: 'auto' // lg:z-auto
        },
        backButton: {
          ...styles.backButton,
          display: 'none' // lg:hidden
        }
      };
    } else if (screenWidth >= 640) { // sm screens
      return {
        ...styles,
        container: {
          ...styles.container,
          width: '320px' // sm:w-80
        },
        header: {
          ...styles.header,
          padding: '12px 16px' // sm:px-4
        },
        avatar: {
          ...styles.avatar,
          width: '40px', // sm:w-10
          height: '40px' // sm:h-10
        },
        avatarText: {
          ...styles.avatarText,
          fontSize: '16px' // sm:text-base
        }
      };
    }
    
    return styles; // Mobile styles
  };

  const responsiveStyles = getResponsiveStyles();

  // Hover effect handlers
  const handleIconMouseOver = (e) => {
    e.target.style.color = '#1f2937'; // hover:text-gray-800
  };

  const handleIconMouseOut = (e) => {
    e.target.style.color = '#4b5563'; // text-gray-600
  };

  return (
    <div style={responsiveStyles.container}>
      {/* Header */}
      <div style={responsiveStyles.header}>
        <div style={responsiveStyles.headerContent}>
          <div style={responsiveStyles.leftSection}>
            <button
              onClick={onClose}
              style={responsiveStyles.backButton}
              onMouseOver={handleIconMouseOver}
              onMouseOut={handleIconMouseOut}
            >
              <ArrowLeft style={{ width: '20px', height: '20px' }} />
            </button>
            <div style={responsiveStyles.avatar}>
              <span style={responsiveStyles.avatarText}>M</span>
            </div>
          </div>
          <div style={responsiveStyles.rightSection}>
            <MoreVertical 
              style={responsiveStyles.actionIcon}
              onMouseOver={handleIconMouseOver}
              onMouseOut={handleIconMouseOut}
            />
          </div>
        </div>
      </div>
      
      {/* Search */}
      <div style={responsiveStyles.searchContainer}>
        <div style={responsiveStyles.searchWrapper}>
          <Search style={responsiveStyles.searchIcon} />
          <input
            type="text"
            placeholder="Search or start new chat"
            style={responsiveStyles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Chat List */}
      <div style={responsiveStyles.chatListContainer}>
        {filteredChats.map(chat => (
          <ChatItem
            key={chat.wa_id}
            chat={chat}
            isSelected={chat.wa_id === selectedChatId}
            onClick={() => {
              onSelectChat(chat.wa_id);
              onClose(); // Close sidebar on mobile after selecting chat
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;