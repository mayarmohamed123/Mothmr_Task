import type { ApiResponse } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://mock-api-plum.vercel.app/api';

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { params?: Record<string, string | number | boolean | undefined> },
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options ?? {};

  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined) {
        url.searchParams.set(key, String(val));
      }
    });
  }

  const res = await fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions?.headers ?? {}),
    },
    // Server-side: no caching for dynamic data by default
    next: fetchOptions?.next,
  });

  const json: ApiResponse<T> | { success: false; message: string; error: { code: string; status: number } } =
    await res.json();

  if (!json.success) {
    const errJson = json as { success: false; message: string; error: { code: string; status: number } };
    throw new ApiClientError(
      errJson.error?.status ?? res.status,
      errJson.error?.code ?? 'UNKNOWN',
      errJson.message,
    );
  }

  return json as ApiResponse<T>;
}

export function buildAuthHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}
