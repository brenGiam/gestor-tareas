const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(email, password) {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail: email, contraseña: password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
    }

    return response.json();
}

export async function registerUser(nombre, apellido, email, password) {
    const response = await fetch(`${BASE_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre,
            apellido,
            mail: email,
            contraseña: password,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrarse");
    }

    return response.json();
}