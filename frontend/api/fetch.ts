import queryString from "query-string";

// const apiUrl = process.env.API_URL;
const apiPublicUrl = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = RequestInit & { params?: Record<string, any> };

export const apiFetch = async (url: string, options: FetchOptions = {}) => {
  const { params, headers, ...restOptions } = options;

  const fullUrl = `${apiPublicUrl}${url}${
    params ? `?${queryString.stringify(params)}` : ""
  }`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(headers || {}),
  };

  return fetch(fullUrl, {
    ...restOptions,
    headers: defaultHeaders,
  });
};
