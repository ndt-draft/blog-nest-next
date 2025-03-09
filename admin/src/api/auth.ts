import { apiFetch } from "./fetch";

export function handleLogin(credentials: { email: string; password: string }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function handleProfile() {
  return apiFetch("/auth/profile", { method: "GET" });
}
