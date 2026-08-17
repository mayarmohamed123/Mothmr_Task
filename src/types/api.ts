// Generic API response envelope
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  error: {
    code: string;
    status: number;
    details?: unknown;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Bilingual text object (returned when no ?lang= param)
export interface BilingualText {
  ar: string;
  en: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams {
  q?: string;
}

export interface SortParams {
  sort?: string;
}

export type Lang = 'ar' | 'en';
