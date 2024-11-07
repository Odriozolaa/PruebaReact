const API_URL = "http://localhost:8000/users";  // Cambia esto si despliegas el backend

// Registrar un nuevo usuario
export const register = async (email, password) => {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
        const data = await response.json();
        if (!response.ok) {
        throw new Error(data.detail || "Error en el registro");
    }
        return data;
};

    // Iniciar sesión
export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Error en el inicio de sesión");
    }

    // Guardar el token en localStorage
    localStorage.setItem("token", data.access_token);

    return data;
};

// Obtener el usuario actual (ruta protegida)
export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No hay token disponible");
    }

    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
        "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("No autorizado");
    }

    return await response.json();
};

// Cerrar sesión
export const logout = () => {
    localStorage.removeItem("token");
};