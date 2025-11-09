// Centralized async error handling hook for React components
import { useState } from 'react';

interface UseSafeAsyncOptions {
  onError?: (error: Error) => void;
  showToast?: boolean;
}

export const useSafeAsync = (options: UseSafeAsyncOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T>(
    asyncFn: () => Promise<T>,
    successCallback?: (result: T) => void
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      if (successCallback) {
        successCallback(result);
      }
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);

      if (options.onError) {
        options.onError(err instanceof Error ? err : new Error(errorMessage));
      }

      console.error('Component error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, setError };
};