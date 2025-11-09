// Products API endpoints with query parameter support
export const PRODUCTS_ENDPOINTS = {
  BASE: (params?: Record<string, unknown>) => buildUrl('/products', params),
  STATS: (params?: Record<string, unknown>) => buildUrl('/products/stats', params),
  // Dynamic endpoints (functions that return the full endpoint)
  BY_ID: (id: string, params?: Record<string, unknown>) => buildUrl(`/products/${id}`, params),
} as const;

// Helper function to build URLs with query parameters
function buildUrl(baseUrl: string, params?: Record<string, unknown>): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  const queryString = new URLSearchParams();

  // Add all parameters to query string
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryString.append(key, String(value));
    }
  });

  const query = queryString.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

// Type for products endpoints
export type ProductsEndpoint = typeof PRODUCTS_ENDPOINTS[keyof typeof PRODUCTS_ENDPOINTS];