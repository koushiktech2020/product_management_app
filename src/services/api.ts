import axios from 'axios';
import type {
  RegisterData,
  LoginData,
  ProfileUpdateData,
  ChangePasswordData,
  ProductData,
  ProductQueryParams,
  ProductUpdateData,
} from '../types/api';

const API_BASE = 'http://localhost:5000/api';

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // For cookie-based auth
});

// Auth API functions
export const authAPI = {
  register: (data: RegisterData) => api.post('/auth/register', data),

  login: (data: LoginData) => api.post('/auth/login', data),

  logout: () => api.post('/auth/logout'),

  logoutAll: () => api.post('/auth/logout-all'),

  getProfile: () => api.get('/auth/profile'),

  updateProfile: (data: ProfileUpdateData) => api.put('/auth/profile', data),

  changePassword: (data: ChangePasswordData) => api.put('/auth/change-password', data),
};

// Product API functions (all require authentication)
export const productsAPI = {
  create: (data: ProductData) => api.post('/products', data),

  getAll: (params?: ProductQueryParams) => api.get('/products', { params }),

  getStats: () => api.get('/products/stats'),

  getById: (id: string) => api.get(`/products/${id}`),

  update: (id: string, data: ProductUpdateData) => api.put(`/products/${id}`, data),

  delete: (id: string) => api.delete(`/products/${id}`),
};

export default api;