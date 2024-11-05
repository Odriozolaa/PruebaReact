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

export async function getAlumnosByGrado(gradoId) {
    try {
        const response = await fetch(`/alumnos/grado/${gradoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener alumnos por grado');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}