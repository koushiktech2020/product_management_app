// Products API endpoints
export const PRODUCTS_ENDPOINTS = {
  BASE: '/products',
  STATS: '/products/stats',
  // Dynamic endpoints (functions that return the full endpoint)
  BY_ID: (id: string) => `/products/${id}`,
} as const;

// Type for products endpoints
export type ProductsEndpoint = typeof PRODUCTS_ENDPOINTS[keyof typeof PRODUCTS_ENDPOINTS];