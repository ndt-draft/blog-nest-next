const backendUri = import.meta.env.VITE_BACKEND_URI;

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${backendUri}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
}

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
