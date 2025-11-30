export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}
