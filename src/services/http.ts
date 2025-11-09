import axios from 'axios';

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
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('userId');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default http;