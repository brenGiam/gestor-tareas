"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../../lib/api";
import Image from "next/image";
import styles from "@/styles/editProfile.module.css";

export default function Users() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        nombre: "",
        apellido: "",
        mail: "",
        contraseña: "",
        id: "",
        foto: null,
    });
    const [isEditing, setIsEditing] = useState({
        nombre: false,
        apellido: false,
        mail: false,
        contraseña: false
    });
    const [fotoPreview, setFotoPreview] = useState(null); // Para la previsualización
    const [fotoBase64, setFotoBase64] = useState(null); // Para enviar al backend
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("usuario");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserData({
                nombre: user.nombre,
                apellido: user.apellido,
                mail: user.mail,
                contraseña: "",
                foto: user.foto,
                id: user.id
            });
            setFotoPreview(user.foto);
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoPreview(reader.result);
                setFotoBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    function handleInputChange(field, value) {
        setUserData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }

    function handleEditToggle(field) {
        setIsEditing((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    }

    const handleSave = async () => {
        const storedUser = JSON.parse(localStorage.getItem("usuario"));
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No hay sesión activa. Por favor, inicia sesión nuevamente.");
            return;
        }

        const updatedUser = {
            nombre: userData.nombre,
            apellido: userData.apellido,
            mail: userData.mail,
            ...(userData.contraseña ? { contraseña: userData.contraseña } : {}),
            ...(fotoBase64 ? { foto: fotoBase64 } : {})
        };

        setError(null);
        setSuccessMessage(null);

        try {
            const res = await fetchWithAuth(`http://localhost:4000/api/users/${storedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser),
            });

            const data = await res.json();

            if (res.ok) {
                const responseData = data.usuario || data.updatedUser || {};

                const updatedUserData = {
                    ...storedUser,
                    ...responseData,
                    id: storedUser.id
                };

                localStorage.setItem("usuario", JSON.stringify(updatedUserData));
                setUserData(prev => ({
                    ...prev,
                    ...responseData,
                    contraseña: ""
                }));

                if (responseData.foto) {
                    setFotoPreview(responseData.foto);
                }

                setSuccessMessage("Perfil actualizado con éxito!");

                setIsEditing({
                    nombre: false,
                    apellido: false,
                    mail: false,
                    contraseña: false
                });
            } else {
                console.error("Error al actualizar:", data);
                setError(data.message || "Hubo un error al actualizar el perfil.");
                if (res.status === 401) {
                    setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
                    router.push('/');
                }
            }
        } catch (err) {
            console.error("Error en la petición:", err);
            setError("Ocurrió un error al comunicarse con el servidor.");
        }
    };

    return (
        <div className={styles.mainBox}>
            <button
                className={styles.inicioButton}
                onClick={() => router.push("/dashboard")}
            >Inicio</button>
            <div className={styles.box}>
                <h1 className={styles.title}>Mi cuenta</h1>
                <div className={styles.imageBox}>
                    <Image
                        src={fotoPreview || "/defaultUser.jpg"}
                        width={80}
                        height={80}
                        alt="Foto de perfil"
                        className={styles.image}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />
                </div>
                <div className={styles.formBox}>
                    {["nombre", "apellido", "mail", "contraseña"].map((field) => (
                        <div key={field} className={styles.map}>
                            <label className={styles.label}>{field}</label>
                            <div className={styles.inputBox}>
                                <input
                                    type={field === "contraseña" ? "password" : "text"}
                                    value={userData[field]}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    disabled={!isEditing[field]}
                                    className={`${styles.input} ${isEditing[field] ? styles.inputEditing : styles.inputDisabled}`}
                                />
                                <button
                                    onClick={() => handleEditToggle(field)}
                                    className={styles.buttonEdit}
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {error && <p className={styles.error}>{error}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
                <div className="mt-6">
                    <button onClick={handleSave} className={styles.button}>
                        Aplicar cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
