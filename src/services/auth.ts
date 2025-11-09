import http from './http';
import type {
  RegisterData,
  LoginData,
  ProfileUpdateData,
  ChangePasswordData,
} from '../types/api';
import { AUTH_ENDPOINTS } from './endpoints';
import { apiWrapper } from '../utils/apiWrapper';

// Auth API functions with centralized error handling
export const authAPI = {
  register: (data: RegisterData, params?: Record<string, unknown>) =>
    apiWrapper(() => http.post(AUTH_ENDPOINTS.REGISTER(params), data).then(res => res.data)),

  login: (data: LoginData, params?: Record<string, unknown>) =>
    apiWrapper(() => http.post(AUTH_ENDPOINTS.LOGIN(params), data).then(res => res.data)),

  logout: (params?: Record<string, unknown>) =>
    apiWrapper(() => http.post(AUTH_ENDPOINTS.LOGOUT(params)).then(res => res.data)),

  logoutAll: (params?: Record<string, unknown>) =>
    apiWrapper(() => http.post(AUTH_ENDPOINTS.LOGOUT_ALL(params)).then(res => res.data)),

  getProfile: (params?: Record<string, unknown>) =>
    apiWrapper(() => http.get(AUTH_ENDPOINTS.PROFILE(params)).then(res => res.data)),

  updateProfile: (data: ProfileUpdateData, params?: Record<string, unknown>) =>
    apiWrapper(() => http.put(AUTH_ENDPOINTS.UPDATE_PROFILE(params), data).then(res => res.data)),

  changePassword: (data: ChangePasswordData, params?: Record<string, unknown>) =>
    apiWrapper(() => http.put(AUTH_ENDPOINTS.CHANGE_PASSWORD(params), data).then(res => res.data)),
};

export default authAPI;