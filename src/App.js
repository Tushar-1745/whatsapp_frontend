import React from 'react';
import ChatList from './component/ChatList';
import ChatWindow from './component/ChatWindow';
import WelcomeScreen from './component/WelcomeScreen';
import AuthScreen from './component/AuthScreen';
import LoadingScreen from './component/loadingScreen';
import { useChat } from './hooks/useChat';
import { useResponsive } from './hooks/useResponsive';
import { useAuth } from './hooks/useAuth';
import { initialChats } from './data/mockData';

const App = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error: authError,
    signup, 
    login, 
    clearError 
  } = useAuth();
  
  const {
    chats,
    selectedChat,
    selectedChatId,
    selectChat,
    sendMessage,
  } = useChat(initialChats);

  const {
    isMobile,
    sidebarVisible,
    closeSidebar,
    openSidebar,
  } = useResponsive();

  const handleBackClick = () => {
    selectChat(null);
    closeSidebar();
  };

  const handleSignup = async (userData) => {
    const result = await signup(userData);
    if (result.success) {
      console.log('Signup successful:', result.message);
    }
    // Errors are handled by useAuth hook
  };

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      console.log('Login successful:', result.message);
    }
    // Errors are handled by useAuth hook
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show auth screen if user is not authenticated
  if (!isAuthenticated) {
    return (
      <AuthScreen 
        onSignup={handleSignup}
        onLogin={handleLogin}
        authError={authError}
        clearAuthError={clearError}
        isLoading={isLoading}
      />
    );
  }

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 40,
      display: 'block'
    },
    chatListContainer: {
      width: isMobile ? '100%' : '350px',
      minWidth: isMobile ? 'auto' : '300px',
      maxWidth: isMobile ? '100%' : '400px',
      flexShrink: 0
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0 // Prevents flex item from overflowing
    }
  };

  // Media queries for responsive behavior
  const mediaQueries = `
    @media (max-width: 1023px) {
      .mobile-hidden {
        display: none !important;
      }
      .mobile-overlay {
        display: block;
      }
    }
    @media (min-width: 1024px) {
      .desktop-hidden {
        display: none !important;
      }
      .mobile-overlay {
        display: none !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueries}</style>
      <div style={styles.container}>
        {/* Overlay for mobile sidebar */}
        {sidebarVisible && isMobile && (
          <div 
            style={styles.overlay}
            className="mobile-overlay desktop-hidden"
            onClick={closeSidebar}
          />
        )}
                
        {/* Chat List - Left Side */}
        <div 
          style={styles.chatListContainer}
          className={!sidebarVisible && isMobile ? 'mobile-hidden' : ''}
        >
          <ChatList
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={selectChat}
            isVisible={sidebarVisible}
            onClose={closeSidebar}
            currentUser={user} // Pass current user data
          />
        </div>
                
        {/* Main Content - Right Side */}
        <div 
          style={styles.mainContent}
          className={sidebarVisible && isMobile ? 'mobile-hidden' : ''}
        >
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              onSendMessage={sendMessage}
              onBackClick={handleBackClick}
              onMenuClick={openSidebar}
              isVisible={!sidebarVisible || !isMobile}
              currentUser={user} // Pass current user data
            />
          ) : (
            <WelcomeScreen 
              onMenuClick={openSidebar} 
              user={user} // Pass user data to welcome screen
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;