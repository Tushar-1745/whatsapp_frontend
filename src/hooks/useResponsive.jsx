// hooks/useResponsive.js
import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Auto-show sidebar on desktop
      if (width >= 1024) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const closeSidebar = () => setSidebarVisible(false);
  const openSidebar = () => setSidebarVisible(true);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    sidebarVisible,
    toggleSidebar,
    closeSidebar,
    openSidebar
  };
};

// ============================================================================

// constants/theme.js
export const COLORS = {
  primary: {
    green: '#25D366',
    greenDark: '#128C7E',
    greenLight: '#DCF8C6',
  },
  secondary: {
    gray: '#F0F0F0',
    grayDark: '#E5E5E5',
    grayLight: '#F8F9FA',
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    muted: '#9CA3AF',
  },
  status: {
    online: '#25D366',
    offline: '#9CA3AF',
    away: '#F59E0B',
  }
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const ANIMATIONS = {
  slideIn: 'transform transition-transform duration-300 ease-in-out',
  fadeIn: 'opacity-0 animate-fadeIn',
  bounce: 'animate-bounce',
};
