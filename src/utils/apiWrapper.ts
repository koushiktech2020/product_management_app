// API wrapper utility for centralized error handling
import { handleApiError, type ApiError } from './apiErrorHandler';

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  loading?: boolean;
}

export interface ApiWrapperOptions {
  showToast?: boolean;
  logError?: boolean;
  redirectOnAuthError?: boolean;
  showLoading?: boolean;
}

/**
 * Wraps async API functions with automatic error handling
 * @param asyncFn - The async function to wrap
 * @param options - Options for error handling behavior
 * @returns Promise<ApiResult<T>> - Standardized result object
 */
export const apiWrapper = async <T>(
  asyncFn: () => Promise<T>,
  options: ApiWrapperOptions = {}
): Promise<ApiResult<T>> => {
  const {
    showToast = true,
    logError = true,
    redirectOnAuthError = true,
    showLoading = false
  } = options;

  try {
    if (showLoading) {
      // Could integrate with loading state management here
    }

    const data = await asyncFn();

    return {
      success: true,
      data,
      loading: false
    };

  } catch (error) {
    const apiError = handleApiError(error, {
      showToast,
      logError,
      redirectOnAuthError
    });

    return {
      success: false,
      error: apiError,
      loading: false
    };
  }
};

/**
 * Simplified version that throws standardized errors instead of returning result objects
 * @param asyncFn - The async function to wrap
 * @param options - Options for error handling behavior
 * @returns Promise<T> - The result or throws ApiError
 */
export const apiWrapperThrow = async <T>(
  asyncFn: () => Promise<T>,
  options: ApiWrapperOptions = {}
): Promise<T> => {
  const result = await apiWrapper(asyncFn, options);

  if (!result.success) {
    throw result.error;
  }

  return result.data as T;
};

/**
 * Hook-style API wrapper for React components with loading states
 * @param asyncFn - The async function to execute
 * @param options - Options for error handling
 * @returns Promise with loading state management
 */
export const useApiCall = async <T>(
  asyncFn: () => Promise<T>,
  options: ApiWrapperOptions & {
    setLoading?: (loading: boolean) => void;
    setError?: (error: ApiError | null) => void;
    setData?: (data: T) => void;
  } = {}
): Promise<ApiResult<T>> => {
  const {
    setLoading,
    setError,
    setData,
    ...apiOptions
  } = options;

  // Set loading state
  setLoading?.(true);
  setError?.(null);

  try {
    const result = await apiWrapper(asyncFn, apiOptions);

    if (result.success && result.data !== undefined) {
      setData?.(result.data);
    } else if (result.error) {
      setError?.(result.error);
    }

    return result;

  } finally {
    // Always clear loading state
    setLoading?.(false);
  }
};

/**
 * Batch API calls with centralized error handling
 * @param apiCalls - Array of async functions to execute
 * @param options - Options for error handling
 * @returns Promise<ApiResult<T>[]> - Array of results
 */
export const batchApiCalls = async <T>(
  apiCalls: (() => Promise<T>)[],
  options: ApiWrapperOptions = {}
): Promise<ApiResult<T>[]> => {
  const promises = apiCalls.map(asyncFn => apiWrapper(asyncFn, options));
  return Promise.all(promises);
};

/**
 * Retry mechanism for failed API calls
 * @param asyncFn - The async function to retry
 * @param maxRetries - Maximum number of retry attempts
 * @param delay - Delay between retries in milliseconds
 * @param options - Options for error handling
 * @returns Promise<ApiResult<T>>
 */
export const retryApiCall = async <T>(
  asyncFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  options: ApiWrapperOptions = {}
): Promise<ApiResult<T>> => {
  let lastError: ApiError | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiWrapper(asyncFn, { ...options, showToast: false });
    } catch (error) {
      lastError = error as ApiError;

      // Don't retry on authentication or validation errors
      if (lastError?.status === 401 || lastError?.status === 422) {
        break;
      }

      // Wait before retrying (except on last attempt)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
      }
    }
  }

  // Return the last error if all retries failed
  return {
    success: false,
    error: lastError,
    loading: false
  };
};