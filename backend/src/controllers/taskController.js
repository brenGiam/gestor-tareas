const Task = require('../models/taskModel');

// Obtener todas las tareas por usuario
exports.getTasks = (req, res, next) => {
    const userId = req.user.id;

    Task.getByUserId(userId, (err, results) => {
        if (err) return next(err);
        res.json(results);
    });
};

// Crear una tarea
exports.createTask = (req, res, next) => {
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
        if (err) return next(err);
        res.status(201).json({ mensaje: 'Tarea creada con éxito', id: result.insertId });
    });
};

// Actualizar una tarea por ID
exports.updateTask = (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { titulo, descripcion, categoria, estado } = req.body;

    Task.findById(id, (err, task) => {
        if (err) return next(err);
        if (!task) return next({ status: 404, message: 'Tarea no encontrada' });

        // Verificar que la tarea pertenezca al usuario logueado
        if (task.usuario_id !== userId) {
            return next({ status: 403, message: 'No tienes permiso para modificar esta tarea' });
        }

        const updatedTask = {
            titulo,
            descripcion,
            categoria,
            estado
        };

        Task.update(id, updatedTask, (err, result) => {
            if (err) return next(err);
            res.json({ mensaje: 'Tarea actualizada con éxito' });
        });
    });
};

// Eliminar una tarea por ID
exports.deleteTask = (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    Task.findById(id, (err, task) => {
        if (err) return next(err);
        if (!task) return next({ status: 404, message: 'Tarea no encontrada' });

        if (task.usuario_id !== userId) {
            return next({ status: 403, message: 'No tienes permiso para eliminar esta tarea' });
        }

        Task.remove(id, (err) => {
            if (err) return next(err);
            res.json({ mensaje: 'Tarea eliminada con éxito' });
        });
    });
};
