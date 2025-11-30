import { createContext, useEffect, useState } from "react";
import { api } from "@/lib/apli-client";
import { getToken, setToken, clearToken } from "@/lib/auth";
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

    console.log("Login response:", data);
    setToken(data.accessToken);
    
    // Normalizar los datos del usuario
    const userData = data.user as any;
    const normalizedUser: User = {
      id: userData.sub || userData.id || userData._id,
      email: userData.email,
      name: userData.name || userData.email,
      role: userData.role,
      avatarUrl: userData.avatarUrl || null,
    };
    
    console.log("Normalized user on login:", normalizedUser);
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
      await api.post(`${config.API_AUTHENTICATION_URL}/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get<any>(
          `${config.API_AUTHENTICATION_URL}/verify-token`
        );
        console.log("Verified user data:", response);
        
        // La respuesta tiene una estructura anidada: { valid: true, user: {...} }
        const userData = response.user || response;
        
        // Mapear el campo 'sub' a 'id' para consistencia
        const normalizedUser: User = {
          id: userData.sub || userData.id || userData._id,
          email: userData.email,
          name: userData.name || userData.dbName || userData.email,
          role: userData.role,
          avatarUrl: userData.avatarUrl || null,
        };
        
        console.log("Normalized user:", normalizedUser);
        setUser(normalizedUser);
        setIsAuthenticated(true);
      } catch {
        clearToken();
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
