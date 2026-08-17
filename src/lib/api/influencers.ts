import { apiFetch } from './client';
import type { Influencer } from '@/types/influencer';
import type { ApiResponse } from '@/types/api';

interface InfluencersParams {
  page?: number;
  limit?: number;
  q?: string;
  sort?: string;
  category?: string;
}

export async function getInfluencers(params?: InfluencersParams): Promise<ApiResponse<Influencer[]>> {
  return apiFetch<Influencer[]>('/influencers', {
    params: params as Record<string, string | number | boolean | undefined>,
    next: { revalidate: 60 },
  });
}

export async function getInfluencer(id: string): Promise<ApiResponse<Influencer>> {
  return apiFetch<Influencer>(`/influencers/${id}`, { next: { revalidate: 60 } });
}
