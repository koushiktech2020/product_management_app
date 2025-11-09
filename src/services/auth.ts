import http from './http';
import type {
  RegisterData,
  LoginData,
  ProfileUpdateData,
  ChangePasswordData,
} from '../types/api';
import { AUTH_ENDPOINTS } from './endpoints';

// Auth API functions with flexible endpoint building
export const authAPI = {
  register: (data: RegisterData, params?: Record<string, unknown>) =>
    http.post(AUTH_ENDPOINTS.REGISTER(params), data),

  login: (data: LoginData, params?: Record<string, unknown>) =>
    http.post(AUTH_ENDPOINTS.LOGIN(params), data),

  logout: (params?: Record<string, unknown>) =>
    http.post(AUTH_ENDPOINTS.LOGOUT(params)),

  logoutAll: (params?: Record<string, unknown>) =>
    http.post(AUTH_ENDPOINTS.LOGOUT_ALL(params)),

  getProfile: (params?: Record<string, unknown>) =>
    http.get(AUTH_ENDPOINTS.PROFILE(params)),

  updateProfile: (data: ProfileUpdateData, params?: Record<string, unknown>) =>
    http.put(AUTH_ENDPOINTS.UPDATE_PROFILE(params), data),

  changePassword: (data: ChangePasswordData, params?: Record<string, unknown>) =>
    http.put(AUTH_ENDPOINTS.CHANGE_PASSWORD(params), data),
};

export default authAPI;