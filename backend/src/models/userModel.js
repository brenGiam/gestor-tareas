const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getAll = (callback) => {
    db.query('SELECT id, nombre, apellido, mail FROM usuarios', callback);
};

// Crear un nuevo usuario
exports.create = async (user, callback) => {
    try {
        const sql = `
        INSERT INTO usuarios (nombre, apellido, mail, contraseña)
        VALUES (?, ?, ?, ?)`;
        const values = [
            user.nombre,
            user.apellido,
            user.mail,
            user.contraseña
        ];
        db.query(sql, values, callback);
    } catch (error) {
        callback(error);
    }
};

// Buscar un usuario por email
exports.findByEmail = (mail, callback) => {
    db.query('SELECT * FROM usuarios WHERE mail = ?', [mail], callback);
};

// Actualizar un usuario por ID
exports.update = (id, user, callback) => {
    const sql = `UPDATE usuarios SET nombre = ?, apellido = ?, mail = ? WHERE id = ?`;
    const values = [user.nombre, user.apellido, user.mail, id];
    db.query(sql, values, callback);
};

// Eliminar un usuario por ID
exports.remove = (id, callback) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
};