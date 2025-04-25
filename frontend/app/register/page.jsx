'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import styles from "@/styles/register.module.css";

export default function Register() {
    const router = useRouter();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!nombre) newErrors.nombre = "El nombre es obligatorio.";
        if (!apellido) newErrors.apellido = "El apellido es obligatorio.";
        if (!email) newErrors.email = "El email es obligatorio.";
        if (!password) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");
        setSuccessMessage("");

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await registerUser(nombre, apellido, email, password);
            setSuccessMessage("¡Te registraste con éxito! Ahora, por favor, inicia sesión. Redirigiendo...");
            setTimeout(() => {
                router.push("/"); // redirige al login
            }, 3000);
        } catch (error) {
            setGeneralError(error.message || "Error en el registro");
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h3 className={styles.title}>Registrate</h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            className={styles.input}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Apellido"
                            className={styles.input}
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                        {errors.apellido && <p className={styles.error}>{errors.apellido}</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>
                    {generalError && <p className={styles.error}>{generalError}</p>}
                    {successMessage && <p className={styles.success}>{successMessage}</p>}
                    <button
                        type="submit"
                        className={styles.button}
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}