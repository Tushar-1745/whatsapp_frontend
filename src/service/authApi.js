// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';


// API endpoints
const ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  VERIFY_TOKEN: '/auth/verify'
};

// HTTP client with error handling
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('whatsapp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(data.message || 'Something went wrong', response.status, data);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(
        'Network error. Please check your connection and try again.',
        0,
        { originalError: error.message }
      );
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// Auth API functions
export const authApi = {
  /**
   * Sign up a new user
   * @param {Object} userData - User signup data
   * @param {string} userData.name - User's full name
   * @param {string} userData.mobile - User's mobile number
   * @param {string} userData.password - User's password
   * @returns {Promise<Object>} User data and token
   */
  async signup(userData) {
    try {
      const response = await apiClient.post(ENDPOINTS.SIGNUP, {
        name: userData.name.trim(),
        mobile: userData.mobile,
        password: userData.password
      });

      // Store token if provided
      if (response.token) {
        localStorage.setItem('whatsapp_token', response.token);
      }

      return {
        success: true,
        user: response.user,
        token: response.token,
        message: response.message || 'Account created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
  },

  /**
   * Log in existing user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.mobile - User's mobile number
   * @param {string} credentials.password - User's password
   * @returns {Promise<Object>} User data and token
   */
  async login(credentials) {
    try {
      const response = await apiClient.post(ENDPOINTS.LOGIN, {
        mobile: credentials.mobile,
        password: credentials.password
      });

      // Store token if provided
      if (response.token) {
        localStorage.setItem('whatsapp_token', response.token);
      }

      return {
        success: true,
        user: response.user,
        token: response.token,
        message: response.message || 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
  },

  /**
   * Verify current token and get user data
   * @returns {Promise<Object>} User data if token is valid
   */
  async verifyToken() {
    try {
      const response = await apiClient.get(ENDPOINTS.VERIFY_TOKEN);
      return {
        success: true,
        user: response.user,
        message: 'Token verified successfully'
      };
    } catch (error) {
      // Remove invalid token
      localStorage.removeItem('whatsapp_token');
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
  },

  /**
   * Refresh authentication token
   * @returns {Promise<Object>} New token
   */
  async refreshToken() {
    try {
      const response = await apiClient.post(ENDPOINTS.REFRESH_TOKEN);
      
      if (response.token) {
        localStorage.setItem('whatsapp_token', response.token);
      }

      return {
        success: true,
        token: response.token,
        message: 'Token refreshed successfully'
      };
    } catch (error) {
      // Remove invalid token
      localStorage.removeItem('whatsapp_token');
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
  },

  /**
   * Log out user
   * @returns {Promise<Object>} Logout status
   */
  async logout() {
    try {
      await apiClient.post(ENDPOINTS.LOGOUT);
      
      // Clear local storage
      localStorage.removeItem('whatsapp_token');
      localStorage.removeItem('whatsapp_auth');
      localStorage.removeItem('whatsapp_user');

      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      // Still clear local storage even if API call fails
      localStorage.removeItem('whatsapp_token');
      localStorage.removeItem('whatsapp_auth');
      localStorage.removeItem('whatsapp_user');
      
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
  }
};

// Utility functions for token management
export const tokenUtils = {
  getToken() {
    return localStorage.getItem('whatsapp_token');
  },

  setToken(token) {
    localStorage.setItem('whatsapp_token', token);
  },

  removeToken() {
    localStorage.removeItem('whatsapp_token');
  },

  isTokenExpired(token) {
    if (!token) return true;
    
    try {
      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }
};

// Export API error class for error handling
export { ApiError };