import { BaseApiService } from '../base/BaseApiService';
import { UserData } from '@/types/auth.types';
import { PaginationParams } from '@/types/api.types';

export class UserService extends BaseApiService {
  constructor() {
    super('/users');
  }

  async getUsers(params?: PaginationParams) {
    const queryString = this.buildQueryString(params || {});
    return this.http.get<UserData[]>(this.getUrl(queryString));
  }

  async getUserById(id: string) {
    return this.http.get<UserData>(this.getUrl(`/${id}`));
  }

  async createUser(userData: Partial<UserData>) {
    return this.http.post<UserData>(this.getUrl(), userData);
  }

  async updateUser(id: string, userData: Partial<UserData>) {
    return this.http.put<UserData>(this.getUrl(`/${id}`), userData);
  }

  async deleteUser(id: string) {
    return this.http.delete(this.getUrl(`/${id}`));
  }
}
