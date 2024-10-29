import { getApiConfig } from '@/config/api.config';
import { HttpClient } from '@/lib/http/HttpClient';
import { PaginationParams } from '@/types/api.types';

export class BaseApiService {
  protected http: HttpClient;
  protected baseUrl: string;

  constructor(path: string) {
    this.http = new HttpClient(getApiConfig());
    this.baseUrl = path;
  }

  protected getUrl(path = ''): string {
    return `${this.baseUrl}${path}`;
  }

  protected buildQueryString(params: PaginationParams): string {
    const query = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });

    const queryString = query.toString();
    return queryString ? `?${queryString}` : '';
  }

  protected setAuthHeader(token: string): void {
    this.http.setAuthHeader(token);
  }
}