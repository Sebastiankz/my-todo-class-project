import { API_BASE_URL } from "@/config";
import { getToken } from "@/lib/auth";

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

// Función base para hacer peticiones
async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown,
  options?: RequestOptions
): Promise<T> {
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = {
    ...options?.headers,
  };

  // Agregar token si existe
  const token = getToken();
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
