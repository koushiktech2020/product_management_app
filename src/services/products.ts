import http from './http';
import type {
  ProductData,
  ProductQueryParams,
  ProductUpdateData,
} from '../types/api';

// Product API functions (all require authentication)
export const productsAPI = {
  create: (data: ProductData) => http.post('/products', data),

  getAll: (params?: ProductQueryParams) => http.get('/products', { params }),

  getStats: () => http.get('/products/stats'),

  getById: (id: string) => http.get(`/products/${id}`),

  update: (id: string, data: ProductUpdateData) => http.put(`/products/${id}`, data),

  delete: (id: string) => http.delete(`/products/${id}`),
};

export default productsAPI;