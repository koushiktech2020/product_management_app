import http from './http';
import type {
  RegisterData,
  LoginData,
  ProfileUpdateData,
  ChangePasswordData,
  AuthResponse,
  LoginResponse,
  ProfileResponse,
} from '../types/api';
import { AUTH_ENDPOINTS } from './endpoints';
import { handleApiError } from '../utils/apiErrorHandler';

// Auth API functions with flexible query parameter support and error handling
export const authAPI = {
  register: async (data: RegisterData, params?: Record<string, unknown>): Promise<AuthResponse> => {
    try {
      const response = await http.post(AUTH_ENDPOINTS.REGISTER(params), data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  login: async (data: LoginData, params?: Record<string, unknown>): Promise<LoginResponse> => {
    try {
      const response = await http.post(AUTH_ENDPOINTS.LOGIN(params), data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: async (params?: Record<string, unknown>): Promise<{ message: string }> => {
    try {
      const response = await http.post(AUTH_ENDPOINTS.LOGOUT(params));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logoutAll: async (params?: Record<string, unknown>): Promise<{ message: string }> => {
    try {
      const response = await http.post(AUTH_ENDPOINTS.LOGOUT_ALL(params));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getProfile: async (params?: Record<string, unknown>): Promise<ProfileResponse> => {
    try {
      const response = await http.get(AUTH_ENDPOINTS.PROFILE(params));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateProfile: async (data: ProfileUpdateData, params?: Record<string, unknown>): Promise<ProfileResponse> => {
    try {
      const response = await http.put(AUTH_ENDPOINTS.UPDATE_PROFILE(params), data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  changePassword: async (data: ChangePasswordData, params?: Record<string, unknown>): Promise<{ message: string }> => {
    try {
      const response = await http.put(AUTH_ENDPOINTS.CHANGE_PASSWORD(params), data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default authAPI;