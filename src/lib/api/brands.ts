import { apiFetch } from './client';
import type { Brand } from '@/types/brand';
import type { ApiResponse } from '@/types/api';

export async function getBrands(): Promise<ApiResponse<Brand[]>> {
  return apiFetch<Brand[]>('/brands', { next: { revalidate: 300 } });
}

export async function getBrand(id: string): Promise<ApiResponse<Brand>> {
  return apiFetch<Brand>(`/brands/${id}`, { next: { revalidate: 300 } });
}
