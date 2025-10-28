// src/services/api.ts

// 📡 URL base del backend (ajustala según tu entorno)
//const BASE_URL = "https://tu-backend.com/api"; 
const API_BASE_URL = "https://pymego.onrender.com/v1/api";

/**
 * Actualiza el estado de un documento en el servidor.
 * 
 * @param id - ID del documento a actualizar
 * @param estado - Estado nuevo ("approved" | "rejected" | "pending_review")
 * @param comentario - Texto opcional con el motivo o nota de actualización
 */
export const updateCreditStatus = async (
  id: number,
  estado: string,
  comentario: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos/${id}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado,
        comentario,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // (Opcional) Si el backend devuelve datos
    const data = await response.json();
    console.log("✅ Estado actualizado correctamente:", data);

  } catch (error) {
    console.error("❌ Error al actualizar el estado:", error);
    throw error; // vuelve a lanzar para que el componente pueda mostrar el mensaje de error
  }
};
