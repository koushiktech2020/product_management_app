// API Error handling utility
interface AxiosError {
  response?: {
    status: number;
    data?: {
      message?: string;
      code?: string;
      [key: string]: unknown;
    };
  };
  request?: unknown;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  redirectOnAuthError?: boolean;
}

/**
 * Centralized API error handler
 * @param error - The error object from API call
 * @param options - Options for error handling behavior
 * @returns Standardized ApiError object
 */
export const handleApiError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): ApiError => {
  const {
    showToast = true,
    logError = true,
    redirectOnAuthError = true
  } = options;

  let apiError: ApiError = {
    message: 'An unexpected error occurred',
    status: 500,
    code: 'UNKNOWN_ERROR'
  };

  // Log error if enabled
  if (logError) {
    console.error('API Error:', error);
  }

  // Handle Axios errors
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // Server responded with error status
      const { status, data } = axiosError.response;

      apiError = {
        message: data?.message || getDefaultErrorMessage(status),
        status,
        code: data?.code || getErrorCode(status),
        details: data
      };

      // Handle authentication errors
      if (status === 401 && redirectOnAuthError) {
        localStorage.removeItem('userId');
        window.location.href = '/';
        return apiError;
      }

    } else if (axiosError.request) {
      // Network error
      apiError = {
        message: 'Network error. Please check your connection.',
        status: 0,
        code: 'NETWORK_ERROR'
      };
    }
  } else if (error instanceof Error) {
    // JavaScript Error
    apiError = {
      message: error.message,
      code: 'JS_ERROR',
      details: error
    };
  }

  // Show toast notification if enabled
  if (showToast) {
    showErrorToast(apiError.message);
  }

  return apiError;
};

/**
 * Get default error message based on HTTP status code
 */
const getDefaultErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Authentication required. Please log in.';
    case 403:
      return 'Access denied. You do not have permission.';
    case 404:
      return 'Resource not found.';
    case 409:
      return 'Conflict with current state.';
    case 422:
      return 'Validation failed. Please check your input.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return `Request failed with status ${status}`;
  }
};

/**
 * Get error code based on HTTP status
 */
const getErrorCode = (status: number): string => {
  switch (status) {
    case 400:
      return 'BAD_REQUEST';
    case 401:
      return 'UNAUTHORIZED';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    case 409:
      return 'CONFLICT';
    case 422:
      return 'VALIDATION_ERROR';
    case 429:
      return 'RATE_LIMITED';
    case 500:
      return 'SERVER_ERROR';
    default:
      return 'HTTP_ERROR';
  }
};

/**
 * Show error toast notification
 * This can be replaced with your preferred toast library
 */
const showErrorToast = (message: string): void => {
  // For now, using console.warn. Replace with your toast library
  console.warn('Error:', message);

  // Example: If using react-toastify
  // toast.error(message);

  // Example: If using your custom toast system
  // showToast({ type: 'error', message });
};

/**
 * Check if an error is an API error
 */
export const isApiError = (error: unknown): error is ApiError => {
  return error !== null &&
         typeof error === 'object' &&
         'message' in error &&
         'status' in error;
};

/**
 * Create a standardized success response wrapper
 */
export const createSuccessResponse = <T>(data: T, message?: string) => ({
  success: true,
  data,
  message: message || 'Operation completed successfully'
});

/**
 * Create a standardized error response wrapper
 */
export const createErrorResponse = (error: ApiError) => ({
  success: false,
  error,
  message: error.message
});