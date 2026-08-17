import { apiFetch, buildAuthHeaders } from './client';
import type { AuthToken, LoginPayload, RegisterPayload, User } from '@/types/auth';
import type { ApiResponse } from '@/types/api';

export async function login(payload: LoginPayload): Promise<ApiResponse<AuthToken>> {
  return apiFetch<AuthToken>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function register(payload: RegisterPayload): Promise<ApiResponse<AuthToken>> {
  return apiFetch<AuthToken>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMe(token: string): Promise<ApiResponse<User>> {
  return apiFetch<User>('/auth/me', {
    headers: buildAuthHeaders(token),
    cache: 'no-store',
  });
}
