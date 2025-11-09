import http from './http';
import type {
  RegisterData,
  LoginData,
  ProfileUpdateData,
  ChangePasswordData,
} from '../types/api';
import { AUTH_ENDPOINTS, type AuthEndpoint } from './endpoints';

// Auth API functions with endpoint parameters
export const authAPI = {
  register: (data: RegisterData, endpoint: AuthEndpoint = AUTH_ENDPOINTS.REGISTER) =>
    http.post(endpoint, data),

  login: (data: LoginData, endpoint: AuthEndpoint = AUTH_ENDPOINTS.LOGIN) =>
    http.post(endpoint, data),

  logout: (endpoint: AuthEndpoint = AUTH_ENDPOINTS.LOGOUT) =>
    http.post(endpoint),

  logoutAll: (endpoint: AuthEndpoint = AUTH_ENDPOINTS.LOGOUT_ALL) =>
    http.post(endpoint),

  getProfile: (endpoint: AuthEndpoint = AUTH_ENDPOINTS.PROFILE) =>
    http.get(endpoint),

  updateProfile: (data: ProfileUpdateData, endpoint: AuthEndpoint = AUTH_ENDPOINTS.UPDATE_PROFILE) =>
    http.put(endpoint, data),

  changePassword: (data: ChangePasswordData, endpoint: AuthEndpoint = AUTH_ENDPOINTS.CHANGE_PASSWORD) =>
    http.put(endpoint, data),
};

export default authAPI;