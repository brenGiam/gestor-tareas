const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear un nuevo usuario (registro)
exports.createUser = (req, res) => {
    const { nombre, apellido, mail, contraseña } = req.body;
    const hashedPassword = bcrypt.hashSync(contraseña, 10);

    const newUser = {
        nombre,
        apellido,
        mail,
        contraseña: hashedPassword
    };

    User.create(newUser, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El email ya está registrado' });
            }
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: result.insertId });
    });
};

// Actualizar un usuario por ID
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, mail, contraseña } = req.body;

    const updatedUser = {
        nombre,
        apellido,
        mail,
        contraseña: bcrypt.hashSync(contraseña, 10)
    };

    User.update(id, updatedUser, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario actualizado con éxito' });
    });
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.remove(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario eliminado con éxito' });
    });
};

// Login de usuario
exports.loginUser = (req, res) => {
    const { mail, contraseña } = req.body;

    User.findByEmail(mail, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

        const user = results[0]; // 💡 importante

        const isMatch = bcrypt.compareSync(contraseña, user.contraseña);
        if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: user.id, email: user.mail },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ mensaje: 'Login exitoso', token });
    });
};