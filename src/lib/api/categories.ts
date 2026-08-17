import { apiFetch } from './client';
import type { Category } from '@/types/category';
import type { ApiResponse } from '@/types/api';

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return apiFetch<Category[]>('/categories', { next: { revalidate: 300 } });
}
