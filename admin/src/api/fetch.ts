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

  const response = await fetch(fullUrl, {
    ...restOptions,
    headers: defaultHeaders,
  });

  if (!response.ok) {
    // Handle HTTP errors
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};
