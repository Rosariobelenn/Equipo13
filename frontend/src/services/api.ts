const API_BASE_URL = "https://pymego.onrender.com/v1/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = true // ✅ parámetro para controlar si envía token
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

if (requiresAuth) {
  const token = localStorage.getItem("token");
  if (token && token !== "null") {
    console.log("📨 Token enviado en header:", token);
    headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("📨 No se envía token (público)");
  }
}


  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    console.error(`❌ Error en ${endpoint}:`, response.status);
    const message = await response.text();
    throw new Error(`Error ${response.status}: ${message}`);
  }

  return response.json();
}
