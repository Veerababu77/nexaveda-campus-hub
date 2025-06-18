
import { User, LoginCredentials, ApiResponse } from '../types';

// Mock data - replace with real API calls
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
};

export const authService = {
  // Replace with actual API call
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - replace with real API
      if (credentials.emailOrPhone && credentials.password) {
        return {
          data: mockUser,
          success: true,
          message: 'Login successful'
        };
      }
      
      return {
        data: null as any,
        success: false,
        message: 'Invalid credentials'
      };
    } catch (error) {
      return {
        data: null as any,
        success: false,
        message: 'Login failed'
      };
    }
  },

  // Replace with actual API call
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        data: null,
        success: true,
        message: 'Logout successful'
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'Logout failed'
      };
    }
  },

  // Replace with actual API call to get current user
  getCurrentUser: async (): Promise<ApiResponse<User | null>> => {
    try {
      // Check if user is logged in (localStorage, token, etc.)
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      
      if (isLoggedIn) {
        return {
          data: mockUser,
          success: true
        };
      }
      
      return {
        data: null,
        success: true
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'Failed to get user'
      };
    }
  }
};
