import { apiFetch, buildAuthHeaders } from './client';
import type { Ad, AdListItem } from '@/types/ad';
import type { ApiResponse } from '@/types/api';
import type { LikeResponse, FavoriteResponse, ViewResponse } from '@/types/comment';

interface AdsParams {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  brand?: string;
  sort?: string;
}

export async function getAds(params?: AdsParams): Promise<ApiResponse<AdListItem[]>> {
  return apiFetch<AdListItem[]>('/ads', {
    params: params as Record<string, string | number | boolean | undefined>,
    next: { revalidate: 60 },
  });
}

export async function getAd(id: string): Promise<ApiResponse<Ad>> {
  return apiFetch<Ad>(`/ads/${id}`, { next: { revalidate: 30 } });
}

export async function getSimilarAds(id: string): Promise<ApiResponse<AdListItem[]>> {
  return apiFetch<AdListItem[]>(`/ads/${id}/similar`, { next: { revalidate: 60 } });
}

export async function likeAd(id: string, token?: string): Promise<ApiResponse<LikeResponse>> {
  return apiFetch<LikeResponse>(`/ads/${id}/like`, {
    method: 'POST',
    headers: token ? buildAuthHeaders(token) : {},
  });
}

export async function favoriteAd(
  id: string,
  token?: string,
): Promise<ApiResponse<FavoriteResponse>> {
  return apiFetch<FavoriteResponse>(`/ads/${id}/favorite`, {
    method: 'POST',
    headers: token ? buildAuthHeaders(token) : {},
  });
}

export async function viewAd(id: string): Promise<ApiResponse<ViewResponse>> {
  return apiFetch<ViewResponse>(`/ads/${id}/view`, { method: 'POST' });
}
