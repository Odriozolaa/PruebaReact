const API_URL = "http://localhost:8000/maestros";

export const createMaestro = async (token, data) => {
    const response = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Error al crear el maestro");
    }
    return await response.json();
};
// src/services/maestroService.js
export async function getMaestros() {
    const response = await fetch('/api/maestros'); // Ajusta el endpoint si es necesario
    if (!response.ok) {
        throw new Error('Failed to fetch maestros');
    }
    return response.json();
}