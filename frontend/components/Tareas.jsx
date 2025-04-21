'use client'

import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import ModalTareas from "./ModalTareas";
import styles from "@/styles/tareas.module.css";

export default function Tareas({ title, tasks }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // 'crear' o 'editar'
    const [selectedTask, setSelectedTask] = useState(null); // Objeto con la tarea seleccionada para editar

    const handleOpenModal = (type, task = null) => {
        setModalType(type);
        if (task) {
            setSelectedTask(task);
            setTitulo(task.titulo);
            setDescripcion(task.descripcion);
        } else {
            setSelectedTask(null);
            setTitulo('');
            setDescripcion('');
        }
        setModalOpen(true);
    };

    const handleSaveTask = () => {
        console.log("click en guardar tarea");
        const token = localStorage.getItem("token");
        console.log("Token obtenido:", token);
        if (!token) {
            console.error("No hay token");
            return;
        }
        const decoded = jwtDecode(token);
        const usuario_id = decoded.id;
        const tareaData = {
            titulo: titulo || "Sin título",
            descripcion: descripcion || "",
            categoria: categoria,
            estado: title,
            fecha_creacion: new Date().toISOString().split("T")[0],
            usuario_id: usuario_id
        };

        if (modalType === "crear") {
            fetch("http://localhost:4000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(tareaData),
            })
                .then((res) => {
                    console.log("Respuesta del servidor:", res);
                    return res.json();
                })
                .then((data) => {
                    console.log("Tarea creada:", data);
                })
                .catch((err) => console.error("Error al crear tarea:", err));
        } else if (modalType === "editar") {
            fetch(`http://localhost:4000/api/tasks/${selectedTask.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...selectedTask,
                    titulo,
                    descripcion
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Tarea actualizada:", data);
                    // Opción: recargar tareas desde el backend
                })
                .catch((err) => console.error("Error al editar tarea:", err));
        }

        setModalOpen(false);
    };
    return (
        <div className={styles.taskContainer}>
            <h2 className={styles.taskHeader}>{title}</h2>
            <div className={styles.taskBody}>
                <ul>
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={styles.taskStyle}
                            onClick={() => handleOpenModal("editar", task)}
                        >
                            {task.titulo}
                        </li>
                    ))}
                </ul>
            </div>
            <button className={styles.taskButton} onClick={() => handleOpenModal("crear")}>
                + Añadí una tarea
            </button>

            <ModalTareas isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h3 className={styles.h3Style}>
                    {modalType === "crear" ? "Añadir nueva tarea" : "Editar tarea"}
                </h3>
                <input
                    type="text"
                    placeholder="Nombre de la tarea"
                    value={titulo}
                    className={styles.inputStyle}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    className={styles.inputStyle}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <select
                    value={categoria}
                    className={styles.inputStyle}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="">Seleccionar categoría</option>
                    <option value="personal">Personal</option>
                    <option value="trabajo">Trabajo</option>
                    <option value="estudio">Estudio</option>
                    <option value="otro">Otro</option>
                </select>
                <button
                    className={styles.modalButton}
                    onClick={handleSaveTask}
                >
                    {modalType === "crear" ? "Guardar tarea" : "Guardar cambios"}
                </button>
            </ModalTareas>
        </div>
    );
}