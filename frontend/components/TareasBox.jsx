'use client'

import { useEffect, useState } from "react";
import Tareas from "./Tareas";

export default function TareasBox() {
    const [tareas, setTareas] = useState([]);

    const fetchTareas = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:4000/api/tasks", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => setTareas(data))
            .catch((err) => console.error("Error al obtener tareas:", err));
    };

    useEffect(() => {
        fetchTareas();
    }, []);

    const tareasPorEstado = {
        "To Do": [],
        "In Progress": [],
        "In Review": [],
        "Completed": [],
    };

    // Clasificamos tareas según el estado
    tareas.forEach((tarea) => {
        const estadoNormalizado = tarea.estado.toLowerCase().replace("_", " ");
        const columna = Object.keys(tareasPorEstado).find(
            (key) => key.toLowerCase() === estadoNormalizado
        );
        if (columna) tareasPorEstado[columna].push(tarea);
    });

    const mainBox = "flex gap-8 p-4 justify-center";

    return (
        <div className={mainBox}>
            {Object.entries(tareasPorEstado).map(([estado, tasks], index) => (
                <Tareas key={index} title={estado} tasks={tasks} fetchTareas={fetchTareas} />
            ))}
        </div>
    );
}