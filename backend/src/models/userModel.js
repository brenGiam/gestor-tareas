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

// Buscar un usuario por id
exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results.length === 0) {
                return resolve(null);
            }
            resolve(results[0]);
        });
    });
};

// Actualizar un usuario por ID
exports.update = (id, user) => {
    return new Promise((resolve, reject) => {

        let fields = [];
        let values = [];

        if (user.nombre) {
            fields.push('nombre = ?');
            values.push(user.nombre);
        }

        if (user.apellido) {
            fields.push('apellido = ?');
            values.push(user.apellido);
        }

        if (user.mail) {
            fields.push('mail = ?');
            values.push(user.mail);
        }

        if (user.contraseña) {
            fields.push('contraseña = ?');
            values.push(user.contraseña);
        }

        if (user.foto) {
            fields.push('foto = ?');
            values.push(user.foto);
        }

        values.push(id);

        const sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`;

        db.query(sql, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

// Eliminar un usuario por ID
exports.remove = (id, callback) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
};