export interface ApiResponse<T = unknown> {
  data: T;
  error?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}
