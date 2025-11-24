import http from './http';
import type {
  ProductData,
  ProductQueryParams,
  ProductUpdateData,
} from '../types/api';
import { apiWrapper } from '../utils/apiWrapper';

// Product API functions with centralized error handling

export const productsAPI = {
  create: (url: string, data: ProductData) =>
    apiWrapper(() => http.post(url, data).then(res => res.data)),

  bulk: (url: string, products: ProductData[]) =>
    apiWrapper(() => http.post(url, { products }).then(res => res.data)),

  getAll: (url: string, queryParams?: ProductQueryParams) =>
    apiWrapper(() => http.get(url, { params: queryParams }).then(res => res.data)),

  getStats: (url: string) =>
    apiWrapper(() => http.get(url).then(res => res.data)),

  getById: (url: string) =>
    apiWrapper(() => http.get(url).then(res => res.data)),

  update: (url: string, data: ProductUpdateData) =>
    apiWrapper(() => http.put(url, data).then(res => res.data)),

  delete: (url: string) =>
    apiWrapper(() => http.delete(url).then(res => res.data)),
};

export default productsAPI;