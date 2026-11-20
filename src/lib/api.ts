const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Endpoints where a 401 means bad credentials/input, not an expired session.
// These must never trigger a token refresh.
const NO_REFRESH_PREFIXES = ['/auth/', '/refresh', '/logout'];

let refreshPromise: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  // Share a single in-flight refresh across all concurrent 401s.
  refreshPromise ??= fetch(`${API_BASE_URL}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: '{}',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Session expired');
      }
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const canRefresh =
      response.status === 401 &&
      !isRetry &&
      !NO_REFRESH_PREFIXES.some((prefix) => endpoint.startsWith(prefix));

    if (canRefresh) {
      try {
        await refreshSession();
        return apiRequest<T>(endpoint, options, true);
      } catch {
        // Refresh failed — fall through and surface the original error.
      }
    }

    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, data: unknown) => apiRequest<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: <T>(endpoint: string, data: unknown) => apiRequest<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
};
