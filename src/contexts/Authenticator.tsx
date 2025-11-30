import { createContext, useEffect, useState } from "react";
import { api } from "@/lib/apli-client";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "@/lib/auth";
import config from "@/config";
import type {
  User,
  LoginResponse,
  AuthContextType,
  RegisterCredentials,
} from "@/types/auth";

const defaultContextValue: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  loading: true,
};

export const AuthenticatorContext =
  createContext<AuthContextType>(defaultContextValue);

export const AuthenticatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const data = await api.post<LoginResponse>(
      `${config.API_AUTHENTICATION_URL}/login`,
      {
        email,
        password,
      }
    );

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    // Normalizar los datos del usuario
    const userData = data.user;
    const normalizedUser: User = {
      id: userData.id,
      email: userData.email,
      name: userData.name || userData.email,
      role: userData.role,
      avatarUrl: userData.avatarUrl || null,
    };

    setUser(normalizedUser);
    setIsAuthenticated(true);
  };

  const register = async (credentials: RegisterCredentials) => {
    await api.post(
      `${config.API_AUTHENTICATION_URL}/signup-direct`,
      credentials
    );
  };

  const logout = async () => {
    try {
      await api.post(`${config.API_AUTHENTICATION_URL}/logout`, null);
    } catch {
      // Error silencioso en logout
    } finally {
      clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get<{ data: User }>(
          `${config.API_AUTHENTICATION_URL}/verify-token`
        );

        // La respuesta viene en response.data
        const userData = response.data;

        // Mapear el campo 'sub' a 'id' para consistencia
        const normalizedUser: User = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          avatarUrl: userData.avatarUrl || null,
        };

        setUser(normalizedUser);
        setIsAuthenticated(true);
      } catch {
        // El refresh se maneja automáticamente en apli-client.ts
        // Si llega aquí, significa que falló todo (incluyendo el refresh)
        clearTokens();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthenticatorContext.Provider
      value={{ isAuthenticated, user, login, register, logout, loading }}
    >
      {children}
    </AuthenticatorContext.Provider>
  );
};
