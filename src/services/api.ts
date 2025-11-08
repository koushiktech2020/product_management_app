import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // For cookie-based auth
});

// Auth API functions
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  logout: () => api.post('/auth/logout'),

  logoutAll: () => api.post('/auth/logout-all'),

  getProfile: () => api.get('/auth/profile'),

  updateProfile: (data: { name?: string; email?: string }) =>
    api.put('/auth/profile', data),

  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    api.put('/auth/change-password', data),
};

// Product API functions (all require authentication)
export const productsAPI = {
  create: (data: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  }) => api.post('/products', data),

  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => api.get('/products', { params }),

  getStats: () => api.get('/products/stats'),

  getById: (id: string) => api.get(`/products/${id}`),

  update: (id: string, data: Partial<{
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  }>) => api.put(`/products/${id}`, data),

  delete: (id: string) => api.delete(`/products/${id}`),
};

export default api;