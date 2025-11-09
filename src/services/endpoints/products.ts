// Products API endpoints with query parameter support
import { buildUrl } from '../../utils/urlBuilder';

export const PRODUCTS_ENDPOINTS = {
  BASE: (params?: Record<string, unknown>) => buildUrl('/products', params),
  STATS: (params?: Record<string, unknown>) => buildUrl('/products/stats', params),
  // Dynamic endpoints (functions that return the full endpoint)
  BY_ID: (id: string, params?: Record<string, unknown>) => buildUrl(`/products/${id}`, params),
} as const;

// Type for products endpoints
export type ProductsEndpoint = typeof PRODUCTS_ENDPOINTS[keyof typeof PRODUCTS_ENDPOINTS];