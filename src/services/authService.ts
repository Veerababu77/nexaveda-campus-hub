import axios from 'axios';
import { User, LoginCredentials, ApiResponse } from '../types';

const BASE_URL = 'https://nexaveda.duckdns.org'; // or your deployed backend URL

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      const response = await axios.post(`${BASE_URL}/nexaveda/login/`, {
        username: credentials.emailOrPhone,
        password: credentials.password
      });

      if (response.status === 200 && response.data.success) {
        const { access, refresh, student_id, username } = response.data.data;

        // ✅ Store tokens and user info properly
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userId", student_id);
        localStorage.setItem("username", username);

        const user: User = {
          id: student_id,
          name: username,
          email: '',
          phone: username
        };

        return {
          data: user,
          success: true,
          message: 'Login successful'
        };
      }

      return {
        data: null as any,
        success: false,
        message: response.data.message || 'Login failed'
      };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        message: error?.response?.data?.message || 'Login failed'
      };
    }
  },

  logout: async (): Promise<ApiResponse<null>> => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    return {
      data: null,
      success: true,
      message: 'Logout successful'
    };
  },

  getCurrentUser: async (): Promise<ApiResponse<User | null>> => {
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    if (token && id && username) {
      return {
        data: {
          id,
          name: username,
          email: '',
          phone: username
        },
        success: true
      };
    }

    return {
      data: null,
      success: false,
      message: 'User not logged in'
    };
  }
};
