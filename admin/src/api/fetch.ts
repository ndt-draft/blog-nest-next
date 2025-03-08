import auth from "@/lib/auth";
import queryString from "query-string";

// const apiUrl = process.env.API_URL;
const backendUri = import.meta.env.VITE_BACKEND_URI;

type FetchOptions = RequestInit & { params?: Record<string, any> };

export const apiFetch = async (url: string, options: FetchOptions = {}) => {
  const { params, headers, ...restOptions } = options;

  const fullUrl = `${backendUri}${url}${
    params ? `?${queryString.stringify(params)}` : ""
  }`;

  const authorization = {
    Authorization: `Bearer ${auth.getItem("token")}`,
  };

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(authorization || {}),
    ...(headers || {}),
  };

  return fetch(fullUrl, {
    ...restOptions,
    headers: defaultHeaders,
  });
};
