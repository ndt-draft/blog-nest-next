import { apiFetch } from "./fetch";

export async function handleLogin(credentials: {
  email: string;
  password: string;
}) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function handleProfile() {
  return apiFetch("/auth/profile", { method: "GET" });
}
