// src/services/api.ts
const API_BASE_URL = "https://pymego.onrender.com/v1/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Error ${response.status}: ${message}`);
  }

  return response.json();
}
