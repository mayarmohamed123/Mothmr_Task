import { apiFetch } from './client';
import type { SiteConfig } from '@/types/config';
import type { ApiResponse } from '@/types/api';

export async function getSiteConfig(): Promise<ApiResponse<SiteConfig>> {
  return apiFetch<SiteConfig>('/config', { next: { revalidate: 3600 } });
}
