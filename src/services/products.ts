import http from './http';
import type {
  ProductData,
  ProductQueryParams,
  ProductUpdateData,
} from '../types/api';
import { PRODUCTS_ENDPOINTS } from './endpoints';

// Product API functions with flexible query parameter support
export const productsAPI = {
  create: (data: ProductData, params?: Record<string, unknown>) =>
    http.post(PRODUCTS_ENDPOINTS.BASE(params), data),

  getAll: (queryParams?: ProductQueryParams, additionalParams?: Record<string, unknown>) => {
    // Merge queryParams with additionalParams for full flexibility
    const allParams = { ...queryParams, ...additionalParams };
    return http.get(PRODUCTS_ENDPOINTS.BASE(allParams));
  },

  getStats: (params?: Record<string, unknown>) =>
    http.get(PRODUCTS_ENDPOINTS.STATS(params)),

  getById: (id: string, params?: Record<string, unknown>) =>
    http.get(PRODUCTS_ENDPOINTS.BY_ID(id, params)),

  update: (id: string, data: ProductUpdateData, params?: Record<string, unknown>) =>
    http.put(PRODUCTS_ENDPOINTS.BY_ID(id, params), data),

  delete: (id: string, params?: Record<string, unknown>) =>
    http.delete(PRODUCTS_ENDPOINTS.BY_ID(id, params)),
};

export default productsAPI;