import { BaseApiService } from '../base/BaseApiService';

interface LoginCredentials {
  email: string;
  password: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

interface LoginResponseData {
  token: string;
}

export class AuthService extends BaseApiService {
  private readonly TOKEN_KEY = 'token';
  
  constructor() {
    super('/auth');
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponseData>> {
    try {
      const response = await this.http.post<ApiResponse<LoginResponseData>>(
        this.getUrl('/login'),
        credentials
      );

      if (response.status === 200 && response.data.data.token) {
        this.setAuthToken(response.data.data.token);
      }

      return response;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials');
      }
      if (error.response?.status === 422) {
        throw new Error('Invalid input data');
      }
      throw new Error(error.message || 'Login failed');
    }
  }

  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await this.http.post<ApiResponse<null>>(
        this.getUrl('/logout'),
        {}
      );
      
      this.removeAuthToken();
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  }

  setAuthToken(token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
      this.http.setAuthHeader(token);
    } catch (error) {
      console.error('Failed to save auth token:', error);
      throw new Error('Failed to save authentication token');
    }
  }

  getAuthToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  removeAuthToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      this.http.removeAuthHeader();
    } catch (error) {
      console.error('Failed to remove auth token:', error);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (!token) return false;
    
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      return tokenData.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  
  async refreshToken(): Promise<ApiResponse<LoginResponseData>> {
    try {
      const response = await this.http.post<ApiResponse<LoginResponseData>>(
        this.getUrl('/refresh'),
        {}
      );

      if (response.status === 200 && response.data.token) {
        this.setAuthToken(response.data.token);
      }

      return response;
    } catch (error: any) {
      this.removeAuthToken();
      throw new Error(error.message || 'Token refresh failed');
    }
  }
}

export const authService = new AuthService();