'use client'

import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import ModalTareas from "./ModalTareas";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import styles from "@/styles/tareas.module.css";

export default function Tareas({ title, tasks, fetchTareas }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estado, setEstado] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);

    const handleOpenModal = (type, task = null) => {
        setModalType(type);
        if (task) {
            setSelectedTask(task);
            setTitulo(task.titulo);
            setDescripcion(task.descripcion);
            setCategoria(task.categoria);
            setEstado(task.estado);
        } else {
            setSelectedTask(null);
            setTitulo('');
            setDescripcion('');
            setCategoria('');
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
                    fetchTareas();
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
                    descripcion,
                    categoria,
                    estado
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Tarea actualizada:", data);
                    fetchTareas();
                })
                .catch((err) => console.error("Error al editar tarea:", err));
        }

        setModalOpen(false);
    };

    const handleDeleteTask = (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`http://localhost:4000/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then(() => {
                fetchTareas();
            })
            .catch((err) => console.error("Error al eliminar tarea:", err));
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
                        >
                            <div className={styles.taskOptionsContainer}>

                                {task.titulo}

                                <div className={styles.taskOptionsIcons}>
                                    <span
                                        className={`
                                    px-2 py-1 text-sm rounded-md 
                                    ${task.categoria === "personal" ? styles.categoriaPersonal : ""}
                                    ${task.categoria === "trabajo" ? styles.categoriaTrabajo : ""}
                                    ${task.categoria === "estudio" ? styles.categoriaEstudio : ""}
                                    ${task.categoria === "otro" ? styles.categoriaOtro : ""}
                                `}
                                    >
                                        {task.categoria}
                                    </span>
                                    <FaEdit
                                        onClick={() => handleOpenModal("editar", task)}
                                        className={styles.editIcon}
                                    />
                                    <FaTrash
                                        onClick={() => handleDeleteTask(task.id)}
                                        className={styles.deleteIcon}
                                    />
                                </div>
                            </div>
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
                {modalType === "editar" && (
                    <select
                        value={estado}
                        className={styles.inputStyle}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="">Seleccionar estado</option>
                        <option value="to do">To Do</option>
                        <option value="in progress">In progress</option>
                        <option value="in review">In Review</option>
                        <option value="completed">Completed</option>
                    </select>
                )}
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