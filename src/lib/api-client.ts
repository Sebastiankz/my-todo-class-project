import config, { API_BASE_URL } from "@/config";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearTokens,
} from "@/lib/auth";
import type { LoginResponse } from "@/types/auth";

type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
};

// Helper para construir URLs con query params
function buildUrl(endpoint: string, params?: RequestOptions["params"]): string {
  const url = new URL(endpoint, API_BASE_URL || window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

// Variable para evitar múltiples refreshes simultáneos
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// Función para refrescar el token
async function refreshAccessToken(): Promise<string> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(
        `${config.API_AUTHENTICATION_URL}/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data: LoginResponse = await response.json();
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      return data.accessToken;
    } catch (error) {
      clearTokens();
      // Solo redirigir si estamos en una página protegida
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Función base para hacer peticiones
async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown,
  options?: RequestOptions,
  isRetry = false
): Promise<T> {
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = {
    ...options?.headers,
  };

  // Agregar token si existe
  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Solo agregar Content-Type si no es FormData
  if (!isFormData && body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(buildUrl(endpoint, options?.params), {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  // Si recibimos 401 y no es un retry, intentar refrescar el token
  if (response.status === 401 && !isRetry) {
    try {
      await refreshAccessToken();
      // Reintentar la petición original con el nuevo token
      return request<T>(endpoint, method, body, options, true);
    } catch {
      throw new Error("Session expired. Please login again.");
    }
  }

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

// API client simple
export const api = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, "GET", undefined, options);
  },

  post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>(endpoint, "POST", body, options);
  },

  put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>(endpoint, "PUT", body, options);
  },

  patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>(endpoint, "PATCH", body, options);
  },

  delete<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>(endpoint, "DELETE", body, options);
  },
};
