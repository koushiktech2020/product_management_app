import http from './http';
import type {
  ProductData,
  ProductQueryParams,
  ProductUpdateData,
} from '../types/api';
import { PRODUCTS_ENDPOINTS } from './endpoints';

// Product API functions with endpoint parameters
export const productsAPI = {
  create: (data: ProductData, endpoint: string = PRODUCTS_ENDPOINTS.BASE) =>
    http.post(endpoint, data),

  getAll: (params?: ProductQueryParams, endpoint: string = PRODUCTS_ENDPOINTS.BASE) =>
    http.get(endpoint, { params }),

  getStats: (endpoint: string = PRODUCTS_ENDPOINTS.STATS) =>
    http.get(endpoint),

  getById: (id: string, endpointFn: (id: string) => string = PRODUCTS_ENDPOINTS.BY_ID) =>
    http.get(endpointFn(id)),

  update: (id: string, data: ProductUpdateData, endpointFn: (id: string) => string = PRODUCTS_ENDPOINTS.BY_ID) =>
    http.put(endpointFn(id), data),

  delete: (id: string, endpointFn: (id: string) => string = PRODUCTS_ENDPOINTS.BY_ID) =>
    http.delete(endpointFn(id)),
};

export default productsAPI;