export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}
