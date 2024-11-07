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
export const getGrados = async (token) => {
    const response = await fetch(`${API_URL}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Aquí va el token
        },
    });
    if (!response.ok) {
        throw new Error("Error al obtener los grados");
    }
    return await response.json();
};