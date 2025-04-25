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

export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const res = await fetch(url, {
        ...options,
        headers,
    });

    // Si el token expiró o es inválido, forzar logout
    if (res.status === 401) {
        const data = await res.json();
        if (data?.mensaje === "Token expirado" || data?.mensaje === "Token inválido") {
            localStorage.removeItem("token");
            window.location.href = "/";
            return;
        }
    }

    return res;
}