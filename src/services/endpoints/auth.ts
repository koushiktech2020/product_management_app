// Authentication API endpoints with query parameter support
export const AUTH_ENDPOINTS = {
  REGISTER: (params?: Record<string, unknown>) => buildUrl('/auth/register', params),
  LOGIN: (params?: Record<string, unknown>) => buildUrl('/auth/login', params),
  LOGOUT: (params?: Record<string, unknown>) => buildUrl('/auth/logout', params),
  LOGOUT_ALL: (params?: Record<string, unknown>) => buildUrl('/auth/logout-all', params),
  PROFILE: (params?: Record<string, unknown>) => buildUrl('/auth/profile', params),
  UPDATE_PROFILE: (params?: Record<string, unknown>) => buildUrl('/auth/profile', params),
  CHANGE_PASSWORD: (params?: Record<string, unknown>) => buildUrl('/auth/change-password', params),
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

// Type for auth endpoints
export type AuthEndpoint = typeof AUTH_ENDPOINTS[keyof typeof AUTH_ENDPOINTS];