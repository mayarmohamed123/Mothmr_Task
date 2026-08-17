import { apiFetch, buildAuthHeaders } from './client';
import type { Comment, SubmitCommentPayload } from '@/types/comment';
import type { ApiResponse } from '@/types/api';

export async function getComments(adId: string): Promise<ApiResponse<Comment[]>> {
  return apiFetch<Comment[]>(`/ads/${adId}/comments`, { next: { revalidate: 30 } });
}

export async function submitComment(
  adId: string,
  payload: SubmitCommentPayload,
  token: string,
): Promise<ApiResponse<Comment>> {
  return apiFetch<Comment>(`/ads/${adId}/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: buildAuthHeaders(token),
  });
}
