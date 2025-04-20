"use client";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await registerUser(nombre, apellido, email, password);
            alert("Registro exitoso, ahora podés iniciar sesión.");
            router.push("/"); // te lleva al login
        } catch (error) {
            alert(error.message || "Error en el registro");
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
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Apellido"
                            className={styles.input}
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
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