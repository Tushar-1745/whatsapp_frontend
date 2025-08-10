import { useState, useEffect } from 'react';
import { authApi, tokenUtils } from '../service/authApi';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenUtils.getToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Check if token is expired
      if (tokenUtils.isTokenExpired(token)) {
        // Try to refresh token
        const refreshResult = await authApi.refreshToken();
        
        if (!refreshResult.success) {
          // If refresh fails, clear everything
          clearAuthData();
          setIsLoading(false);
          return;
        }
      }

      // Verify token with backend
      const verifyResult = await authApi.verifyToken();
      
      if (verifyResult.success) {
        setUser(verifyResult.user);
        setIsAuthenticated(true);
        
        // Update localStorage with fresh user data
        localStorage.setItem('whatsapp_auth', 'true');
        localStorage.setItem('whatsapp_user', JSON.stringify(verifyResult.user));
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authApi.signup(userData);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        
        // Store user data in localStorage
        localStorage.setItem('whatsapp_auth', 'true');
        localStorage.setItem('whatsapp_user', JSON.stringify(result.user));
        
        return { success: true, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Signup failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authApi.login(credentials);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        
        // Store user data in localStorage
        localStorage.setItem('whatsapp_auth', 'true');
        localStorage.setItem('whatsapp_user', JSON.stringify(result.user));
        
        return { success: true, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      clearAuthData();
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      
      // TODO: Add API call to update user on backend
      // const result = await authApi.updateUser(updatedUserData);
      
      setUser(newUserData);
      localStorage.setItem('whatsapp_user', JSON.stringify(newUserData));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: 'Failed to update user data' };
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('whatsapp_auth');
    localStorage.removeItem('whatsapp_user');
    localStorage.removeItem('whatsapp_token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signup,
    login,
    logout,
    updateUser,
    clearError,
    checkAuthStatus
  };
};