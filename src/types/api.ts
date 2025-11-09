// API-related TypeScript types

// Auth types
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

// Auth response types
export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface LoginResponse extends AuthResponse {
  token?: string; // If using token-based auth
}

export interface ProfileResponse extends AuthResponse {
  updatedAt: string;
}

// Product types
export interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string; // Optional for backward compatibility
  stock?: number; // Optional for backward compatibility
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type ProductUpdateData = Partial<ProductData>;