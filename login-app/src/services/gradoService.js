const API_URL = "http://localhost:8000/grados";

export const createGrado = async (token, data) => {
    const response = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Error al crear el grado");
    }
    return await response.json();
};
// src/services/gradoService.js
export async function getGrados() {
    const response = await fetch('/api/grados'); // Ajusta el endpoint si es necesario
    if (!response.ok) {
        throw new Error('Failed to fetch grados');
    }
    return response.json();
}
