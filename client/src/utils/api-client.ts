const API_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean; // For login/signup endpoints
}

// Helper to get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const apiClient = async <T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {}, skipAuth = false } = options;

  const url = `${API_URL}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth header only if token exists and not skipped
  if (!skipAuth) {
    const token = getToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
    // Required for refresh-token cookie auth flows
    credentials: 'include',
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  // Handle 401 Unauthorized: attempt refresh once, then retry original request
  if (response.status === 401 && !skipAuth) {
    try {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        const refreshData: { accessToken: string } = await refreshResponse.json();
        localStorage.setItem('accessToken', refreshData.accessToken);

        const retryHeaders: Record<string, string> = {
          ...defaultHeaders,
          ...headers,
          Authorization: `Bearer ${refreshData.accessToken}`,
        };

        const retryConfig: RequestInit = {
          ...config,
          headers: retryHeaders,
        };

        const retryResponse = await fetch(url, retryConfig);
        if (!retryResponse.ok) {
          const retryErr = await retryResponse.json().catch(() => ({}));
          throw new Error(
            retryErr.message || retryErr.error || `API Error: ${retryResponse.status}`
          );
        }

        return retryResponse.json();
      }
    } catch {
      // fallthrough to logout below
    }

    localStorage.removeItem('accessToken');
    window.dispatchEvent(new Event('logout'));
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.error || `API Error: ${response.status}`);
  }

  return response.json();
};