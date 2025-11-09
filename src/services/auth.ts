import http from './http';
import type {
  RegisterData,
  LoginData,
  ProfileUpdateData,
  ChangePasswordData,
} from '../types/api';

// Auth API functions
export const authAPI = {
  register: (data: RegisterData) => http.post('/auth/register', data),

  login: (data: LoginData) => http.post('/auth/login', data),

  logout: () => http.post('/auth/logout'),

  logoutAll: () => http.post('/auth/logout-all'),

  getProfile: () => http.get('/auth/profile'),

  updateProfile: (data: ProfileUpdateData) => http.put('/auth/profile', data),

  changePassword: (data: ChangePasswordData) => http.put('/auth/change-password', data),
};

export default authAPI;