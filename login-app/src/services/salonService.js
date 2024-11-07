const API_URL = "http://localhost:8000/salones";

export const createSalon = async (token, data) => {
    const response = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Error al crear el salón");
    }
    return await response.json();
};

// Nueva función para obtener salones por grado
export const getSalonesByGrado = async (token, gradoId) => {
    const response = await fetch(`${API_URL}/grado/${gradoId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Error al obtener los salones para el grado especificado");
    }
    return await response.json();
};