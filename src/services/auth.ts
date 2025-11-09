import http from './http';
import type {
  RegisterData,
  LoginData,
  ProfileUpdateData,
  ChangePasswordData,
} from '../types/api';
import { apiWrapper } from '../utils/apiWrapper';

// Auth API functions with centralized error handling
export const authAPI = {
  register: (url: string, data: RegisterData) =>
    apiWrapper(() => http.post(url, data).then(res => res.data)),

  login: (url: string, data: LoginData) =>
    apiWrapper(() => http.post(url, data).then(res => res.data)),

  logout: (url: string) =>
    apiWrapper(() => http.post(url).then(res => res.data)),

  logoutAll: (url: string) =>
    apiWrapper(() => http.post(url).then(res => res.data)),

  getProfile: (url: string) =>
    apiWrapper(() => http.get(url).then(res => res.data)),

  updateProfile: (url: string, data: ProfileUpdateData) =>
    apiWrapper(() => http.put(url, data).then(res => res.data)),

  changePassword: (url: string, data: ChangePasswordData) =>
    apiWrapper(() => http.put(url, data).then(res => res.data)),
};

export default authAPI;