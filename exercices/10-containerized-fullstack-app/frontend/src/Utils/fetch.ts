import { ApiResponse } from './models';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
  method: RequestMethod;
  headers?: HeadersInit;
  body?: unknown;
}

export async function fetchData<T>(
  url: string,
  options: FetchOptions
): Promise<ApiResponse<T>> {
  const { method, headers, body } = options;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok)
    return new ApiResponse<T>(false, response.status, 'Failed to fetch data');

  return new ApiResponse<T>(
    true,
    response.status,
    undefined,
    response.headers.get('Content-Length') !== '0'
      ? await response.json()
      : undefined
  );
}
