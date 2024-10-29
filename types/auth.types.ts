export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
  };
  message: string;
  status: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
}
