// src/services/api.ts

// 📡 URL base del backend (ajustala según tu entorno)
//const BASE_URL = "https://tu-backend.com/api"; 

// src/services/api.ts
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
  try {
    const response = await fetch(`${API_BASE_URL}/v1/api/admin/credit-applications/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Agregá el token si tu backend requiere autenticación:
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: estado,      // 👈 el campo puede llamarse "status" según el backend
        comment: comentario, // 👈 si el backend espera "comment"
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    console.log("✅ Estado actualizado correctamente");
  } catch (error) {
    console.error("❌ Error al actualizar el estado:", error);
    throw error;
  }
};
