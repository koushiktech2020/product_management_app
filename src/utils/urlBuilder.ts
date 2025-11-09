// URL building utility for API endpoints with query parameters
export const buildUrl = (baseUrl: string, params?: Record<string, unknown>): string => {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  const queryString = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryString.append(key, String(value));
    }
  });

  const query = queryString.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
};