import http from './http';
import type {
  ProductData,
  ProductQueryParams,
  ProductUpdateData,
} from '../types/api';
import { PRODUCTS_ENDPOINTS } from './endpoints';
import { apiWrapper } from '../utils/apiWrapper';

// Product API functions with centralized error handling
export const productsAPI = {
  create: (data: ProductData, params?: Record<string, unknown>) =>
    apiWrapper(() => http.post(PRODUCTS_ENDPOINTS.BASE(params), data).then(res => res.data)),

  getAll: (queryParams?: ProductQueryParams, additionalParams?: Record<string, unknown>) => {
    // Merge queryParams with additionalParams for full flexibility
    const allParams = { ...queryParams, ...additionalParams };
    return apiWrapper(() => http.get(PRODUCTS_ENDPOINTS.BASE(allParams)).then(res => res.data));
  },

  getStats: (params?: Record<string, unknown>) =>
    apiWrapper(() => http.get(PRODUCTS_ENDPOINTS.STATS(params)).then(res => res.data)),

  getById: (id: string, params?: Record<string, unknown>) =>
    apiWrapper(() => http.get(PRODUCTS_ENDPOINTS.BY_ID(id, params)).then(res => res.data)),

  update: (id: string, data: ProductUpdateData, params?: Record<string, unknown>) =>
    apiWrapper(() => http.put(PRODUCTS_ENDPOINTS.BY_ID(id, params), data).then(res => res.data)),

  delete: (id: string, params?: Record<string, unknown>) =>
    apiWrapper(() => http.delete(PRODUCTS_ENDPOINTS.BY_ID(id, params)).then(res => res.data)),
};

export default productsAPI;