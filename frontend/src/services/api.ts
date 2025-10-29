const API_BASE_URL = "https://pymego.onrender.com/v1/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  console.log("📨 Token enviado en header:", token);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ... { Authorization: `Bearer ${token}` },
      ...options.headers,
    },
  });

  if (!response.ok) {
    console.error(`❌ Error en ${endpoint}:`, response.status);
    const message = await response.text();
    throw new Error(`Error ${response.status}: ${message}`);
  }

  return response.json();
}
