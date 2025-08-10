// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.config?.url);
    
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API Methods
export const conversationsAPI = {
  // Get all conversations
  getAll: () => apiClient.get('/conversations'),
  
  // Get conversation by wa_id
  getById: (wa_id) => apiClient.get(`/conversations/${wa_id}`),
  
  // Update conversation (mark as read, etc.)
  update: (wa_id, data) => apiClient.put(`/conversations/${wa_id}`, data),
  
  // Delete conversation
  delete: (wa_id) => apiClient.delete(`/conversations/${wa_id}`),
};

export const messagesAPI = {
  // Get messages for a conversation
  getByConversation: (wa_id) => apiClient.get(`/messages/${wa_id}`),
  
  // Send a new message
  send: (messageData) => apiClient.post('/messages', messageData),
  
  // Update message status
  updateStatus: (messageId, status) => 
    apiClient.patch(`/messages/${messageId}/status`, { status }),
  
  // Delete message
  delete: (messageId) => apiClient.delete(`/messages/${messageId}`),
  
  // Search messages
  search: (query, wa_id) => 
    apiClient.get(`/messages/search?q=${encodeURIComponent(query)}&wa_id=${wa_id}`),
};

export const webhookAPI = {
  // Test webhook endpoint
  test: (payload) => apiClient.post('/webhook', payload),
  
  // Get webhook status
  getStatus: () => apiClient.get('/webhook/status'),
};

// Utility functions for API calls
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      message: data.message || data.error || 'Server error occurred',
      status,
      details: data.details || null,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
      details: 'No response from server',
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
      details: null,
    };
  }
};

export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      console.log(`API call failed (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
};

// Export the configured axios instance for custom requests
export default apiClient;