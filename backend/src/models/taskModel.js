const db = require('../config/db');


// Obtener tareas por ID de usuario
exports.getByUserId = (usuario_id, callback) => {
    db.query('SELECT * FROM tareas WHERE usuario_id = ?', [usuario_id], callback);
};

// Buscar una tarea por su ID
exports.findById = (id, callback) => {
    db.query('SELECT * FROM tareas WHERE id = ?', [id], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null);
        callback(null, results[0]);
    });
};

// Crear una nueva tarea
exports.create = (task, callback) => {
    const fechaActual = new Date();
    const sql = `
        INSERT INTO tareas (titulo, descripcion, categoria, estado, fecha_creacion, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
        task.titulo,
        task.descripcion,
        task.categoria,
        task.estado,
        fechaActual,
        task.usuario_id
    ];
    db.query(sql, values, callback);
};

// Actualizar una tarea por ID
exports.update = (id, task, callback) => {
    const sql = `
        UPDATE tareas SET titulo = ?, descripcion = ?, categoria = ?, estado = ?, usuario_id = ?
        WHERE id = ?
    `;
    const values = [
        task.titulo,
        task.descripcion,
        task.categoria,
        task.estado,
        task.usuario_id,
        id
    ];
    db.query(sql, values, callback);
};

// Eliminar una tarea por ID
exports.remove = (id, callback) => {
    db.query('DELETE FROM tareas WHERE id = ?', [id], callback);
};
