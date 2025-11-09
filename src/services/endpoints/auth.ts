// Authentication API endpoints with query parameter support
import { buildUrl } from '../../utils/urlBuilder';

export const AUTH_ENDPOINTS = {
  REGISTER: (params?: Record<string, unknown>) => buildUrl('/auth/register', params),
  LOGIN: (params?: Record<string, unknown>) => buildUrl('/auth/login', params),
  LOGOUT: (params?: Record<string, unknown>) => buildUrl('/auth/logout', params),
  LOGOUT_ALL: (params?: Record<string, unknown>) => buildUrl('/auth/logout-all', params),
  PROFILE: (params?: Record<string, unknown>) => buildUrl('/auth/profile', params),
  UPDATE_PROFILE: (params?: Record<string, unknown>) => buildUrl('/auth/profile', params),
  CHANGE_PASSWORD: (params?: Record<string, unknown>) => buildUrl('/auth/change-password', params),
} as const;

// Type for auth endpoints
export type AuthEndpoint = typeof AUTH_ENDPOINTS[keyof typeof AUTH_ENDPOINTS];