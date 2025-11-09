import axios from 'axios';
import { handleApiError } from '../utils/apiErrorHandler';

const API_BASE = 'http://localhost:5000/api';

// Axios instance with default config
const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // For cookie-based auth
});

// Request interceptor for adding auth headers if needed in future
http.interceptors.request.use(
  (config) => {
    // Add any request interceptors here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Use centralized error handler
    const apiError = handleApiError(error, {
      showToast: false, // Don't show toast in interceptor, let components handle it
      logError: true,
      redirectOnAuthError: true
    });

    return Promise.reject(apiError);
  }
);

export default http;