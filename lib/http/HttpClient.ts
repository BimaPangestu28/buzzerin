import { API_CONFIG } from "@/config/api.config";
import { ApiResponse, ApiError } from "@/types/api.types";

export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private static TOKEN_KEY = 'token';

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.defaultHeaders = {
      ...API_CONFIG.DEFAULT_HEADERS,
      'Content-Type': 'application/json',
    };
    this.initializeAuthHeader();
  }

  private initializeAuthHeader(): void {
    const token = this.getStoredToken();
    if (token) {
      this.setAuthHeader(token);
    }
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(HttpClient.TOKEN_KEY);
    }
    return null;
  }

  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  private createAbortController(): {
    controller: AbortController;
    timeoutId: NodeJS.Timeout;
  } {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    return { controller, timeoutId };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.status === 401) {
      this.clearAuth();
      throw {
        message: "Unauthorized access",
        status: 401,
      };
    }

    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.message || "An error occurred",
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
    };
  }

  private handleError(error: any): never {
    if (error.name === "AbortError") {
      throw {
        message: "Request timeout",
        status: 408,
      };
    }

    throw {
      message: error.message || "An error occurred",
      status: error.status || 500,
    };
  }

  setAuthHeader(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(HttpClient.TOKEN_KEY, token);
    }
    this.defaultHeaders = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(HttpClient.TOKEN_KEY);
    }
    const { Authorization, ...headers } = this.defaultHeaders;
    this.defaultHeaders = headers;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const { controller, timeoutId } = this.createAbortController();
      
      const headers = {
        // ...this.defaultHeaders,
        ...options.headers,
        'Authorization': `Bearer ${this.getStoredToken()}`
      };

      const response = await fetch(this.getFullUrl(endpoint), {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  get<T>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, data: any, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: any, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}