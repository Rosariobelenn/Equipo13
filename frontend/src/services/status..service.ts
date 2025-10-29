// src/services/api.ts

// 📡 URL base del backend
const API_BASE_URL = "https://pymego.onrender.com/v1/api";

/**
 * Actualiza el estado de una solicitud de crédito (solo admin)
 * 
 * @param id - ID de la solicitud
 * @param estado - Estado nuevo ("approved" | "rejected" | "pending_review")
 * @param comentario - Texto opcional con el motivo o nota de actualización
 */

export const updateCreditStatus = async (
  id: number,
  estado: string,
  comentario: string
): Promise<void> => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/admin/credit-applications/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        status: estado,
        comment: comentario,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("📩 Respuesta del servidor:", text);
      throw new Error(`Error ${response.status}: ${text}`);
    }

    console.log("✅ Estado actualizado correctamente");
  } catch (error: any) {
    console.error("❌ Error al actualizar el estado:", error.message);
    throw error;
  }
};


