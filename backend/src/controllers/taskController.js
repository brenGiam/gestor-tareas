const Task = require('../models/taskModel');

// Obtener todas las tareas por usuario
exports.getTasks = (req, res) => {
    const userId = req.user.id;
    Task.getByUserId(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear una tarea
exports.createTask = (req, res) => {
    const userId = req.user.id;
    const { titulo, descripcion, categoria, estado } = req.body;

    const newTask = {
        titulo,
        descripcion,
        categoria,
        estado,
        usuario_id: userId,
        fecha_creacion: new Date()
    };

    Task.create(newTask, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Tarea creada con éxito', id: result.insertId });
    });
};

// Actualizar una tarea por ID
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { titulo, descripcion, categoria, estado } = req.body;

    Task.findById(id, (err, task) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!task) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

        // Verificar que la tarea pertenezca al usuario logueado
        if (task.usuario_id !== userId) {
            return res.status(403).json({ mensaje: 'No tienes permiso para modificar esta tarea' });
        }

        const updatedTask = {
            titulo,
            descripcion,
            categoria,
            estado,
            usuario_id: userId
        };

        Task.update(id, updatedTask, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Tarea actualizada con éxito' });
        });
    });
};

// Eliminar una tarea por ID
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    Task.findById(id, (err, task) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!task) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

        // Verificar que la tarea pertenezca al usuario logueado
        if (task.usuario_id !== userId) {
            return res.status(403).json({ mensaje: 'No tienes permiso para eliminar esta tarea' });
        }

        Task.remove(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Tarea eliminada con éxito' });
        });
    });
};
