// components/WelcomeScreen.jsx
import React from 'react';
import { Menu } from 'lucide-react';

const WelcomeScreen = ({ onMenuClick }) => {
  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#f9fafb', // bg-gray-50
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px', // px-4
    },
    content: {
      textAlign: 'center',
      maxWidth: '28rem', // max-w-md (448px)
    },
    menuButton: {
      position: 'absolute',
      top: '16px', // top-4
      left: '16px', // left-4
      padding: '8px', // p-2
      color: '#4b5563', // text-gray-600
      backgroundColor: 'white',
      borderRadius: '50%', // rounded-full
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', // shadow-md
      cursor: 'pointer',
      display: 'none', // Will be shown on mobile via media query
    },
    avatarContainer: {
      width: '192px', // w-48
      height: '192px', // h-48
      margin: '0 auto 32px auto', // mx-auto mb-8
      backgroundColor: '#e5e7eb', // bg-gray-200
      borderRadius: '50%', // rounded-full
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emoji: {
      fontSize: '72px', // text-6xl
      color: '#9ca3af', // text-gray-400
    },
    title: {
      fontSize: '24px', // text-2xl
      fontWeight: '300', // font-light
      color: '#1f2937', // text-gray-800
      marginBottom: '16px', // mb-4
      margin: '0 0 16px 0',
    },
    description: {
      color: '#4b5563', // text-gray-600
      fontSize: '14px', // text-sm
      lineHeight: '1.625', // leading-relaxed
      margin: 0,
    }
  };

  // Responsive styles
  const getResponsiveStyles = () => {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 1024) { // lg screens
      return {
        ...styles,
        menuButton: { ...styles.menuButton, display: 'none' }, // lg:hidden
        avatarContainer: { 
          ...styles.avatarContainer, 
          width: '320px', // lg:w-80
          height: '320px' // lg:h-80
        },
        emoji: { ...styles.emoji, fontSize: '128px' }, // lg:text-8xl
        title: { ...styles.title, fontSize: '30px' }, // sm:text-3xl
        description: { ...styles.description, fontSize: '16px' } // sm:text-base
      };
    } else if (screenWidth >= 640) { // sm screens
      return {
        ...styles,
        menuButton: { ...styles.menuButton, display: 'none' },
        avatarContainer: { 
          ...styles.avatarContainer, 
          width: '256px', // sm:w-64
          height: '256px' // sm:h-64
        },
        emoji: { ...styles.emoji, fontSize: '96px' }, // sm:text-7xl
        title: { ...styles.title, fontSize: '30px' }, // sm:text-3xl
        description: { ...styles.description, fontSize: '16px' } // sm:text-base
      };
    } else {
      return {
        ...styles,
        menuButton: { ...styles.menuButton, display: 'block' } // Show on mobile
      };
    }
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div style={responsiveStyles.container}>
      <div style={responsiveStyles.content}>
        <button
          onClick={onMenuClick}
          style={responsiveStyles.menuButton}
          onMouseOver={(e) => {
            e.target.style.color = '#1f2937'; // hover:text-gray-800
          }}
          onMouseOut={(e) => {
            e.target.style.color = '#4b5563';
          }}
        >
          <Menu style={{ width: '24px', height: '24px' }} />
        </button>
        <div style={responsiveStyles.avatarContainer}>
          <div style={responsiveStyles.emoji}>💬</div>
        </div>
        <h1 style={responsiveStyles.title}>WhatsApp Web</h1>
        <p style={responsiveStyles.description}>
          Send and receive messages without keeping your phone online.
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;