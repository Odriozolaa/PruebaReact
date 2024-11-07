const API_URL = "http://localhost:8000/alumnos";

export const createAlumno = async (token, data) => {
    const response = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Error al crear el alumno");
    }
    return await response.json();
};

export async function getAlumnosByGrado(gradoId, token) {
    try {
        const response = await fetch(`${API_URL}/grado/${gradoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener alumnos por grado');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Función para actualizar un alumno específico
export const updateAlumno = async (id, data, token) => {
    const response = await fetch(`http://localhost:8000/alumnos/${id}`, {  // Asegúrate de que el ID se coloca correctamente en la URL
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // El token debe ir aquí
        },
        body: JSON.stringify(data),  // Asegúrate de que `data` esté estructurado correctamente
    });
    
    if (!response.ok) {
        throw new Error("Error al actualizar el alumno");
    }
    return await response.json();
};