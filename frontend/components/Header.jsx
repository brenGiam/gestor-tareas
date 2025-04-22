"use client";

import { useEffect, useState, useRef } from "react";
import { lora, montserrat } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/header.module.css";

export default function Header() {
    const [usuario, setUsuario] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("usuario");
            if (storedUser && storedUser !== "undefined") {
                setUsuario(JSON.parse(storedUser));
            }
        };
        handleStorageChange();
        window.addEventListener("storage", handleStorageChange);
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
        window.location.href = "/";
    };

    return (
        <div className={styles.mainBox}>
            <div className={styles.box}>
                <h1 className={`${styles.title} ${montserrat.className}`}>Gestor de Tareas</h1>
                <div className={styles.imageBox}>
                    {usuario ? (
                        <div className={styles.userMenu} ref={dropdownRef}>
                            <div
                                className={styles.userTrigger}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                role="button"
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true"
                            >
                                <Image
                                    src="/defaultUser.jpg"
                                    width={50}
                                    height={50}
                                    alt="Usuario"
                                    className={styles.userAvatar}
                                />
                                <span>Hola, {usuario.nombre}</span>
                                <span className={styles.dropdownArrow}>▼</span>
                            </div>

                            {dropdownOpen && (
                                <div className={styles.dropdown}>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => alert("Editar perfil")}
                                    >
                                        Editar perfil
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleLogout}
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/" className={styles.link}>Iniciar sesión</Link>
                    )}
                </div>
            </div>
            <h2 className={`${styles.subtitle} ${lora.className}`}>
                Organizá tu día, tomá el control de tu tiempo, gestioná con facilidad
                <Image
                    src="/check.png"
                    width={25}
                    height={25}
                    alt="check"
                    className={styles.icon}
                />
            </h2>
        </div>
    );
}