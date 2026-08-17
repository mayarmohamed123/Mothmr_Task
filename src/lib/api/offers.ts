import { apiFetch, buildAuthHeaders } from './client';
import type { Offer, SubmitOfferPayload } from '@/types/offer';
import type { ApiResponse } from '@/types/api';

interface OffersParams {
  page?: number;
  limit?: number;
  q?: string;
}

export async function getOffers(adId: string, params?: OffersParams): Promise<ApiResponse<Offer[]>> {
  return apiFetch<Offer[]>(`/ads/${adId}/offers`, {
    params: params as Record<string, string | number | boolean | undefined>,
    next: { revalidate: 30 },
  });
}

export async function submitOffer(
  adId: string,
  payload: SubmitOfferPayload,
  token: string,
): Promise<ApiResponse<Offer>> {
  return apiFetch<Offer>(`/ads/${adId}/offers`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: buildAuthHeaders(token),
  });
}
