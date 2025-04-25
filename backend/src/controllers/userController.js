const cloudinary = require('../config/cloudinaryConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Obtener todos los usuarios
exports.getUsers = async (req, res, next) => {
    try {
        const results = await User.getAll();
        res.json(results);
    } catch (err) {
        next(err);
    }
};

// Crear un nuevo usuario (registro)
exports.createUser = (req, res, next) => {
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
                return next({ status: 400, message: 'El email ya está registrado' });
            }
            return next(err);
        }

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: result.insertId });
    });
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, apellido, mail, contraseña, foto } = req.body;

    try {
        const currentUser = await User.findById(id);
        if (!currentUser) {
            return next({ status: 404, message: 'Usuario no encontrado' });
        }

        const updateFields = {};

        if (nombre) updateFields.nombre = nombre;
        if (apellido) updateFields.apellido = apellido;
        if (mail) updateFields.mail = mail;
        if (contraseña) updateFields.contraseña = bcrypt.hashSync(contraseña, 10);

        if (foto && foto !== currentUser.foto) {
            try {
                const result = await cloudinary.uploader.upload(foto, {
                    tags: 'profile_pic',
                    public_id: `profile_${id}_${Date.now()}`
                });
                updateFields.foto = result.secure_url;
            } catch (cloudinaryError) {
                req.cloudinaryError = 'No se pudo actualizar la imagen de perfil';
            }
        }

        if (Object.keys(updateFields).length > 0) {
            const result = await User.update(id, updateFields);

            if (result.affectedRows === 0) {
                return next({ status: 404, message: 'Error al actualizar el usuario' });
            }

            const updatedUser = await User.findById(id);
            const { contraseña: _, ...userWithoutPassword } = updatedUser;

            return res.json({
                mensaje: 'Usuario actualizado con éxito',
                usuario: userWithoutPassword,
                advertencias: req.cloudinaryError ? [req.cloudinaryError] : []
            });
        } else {
            return next({ status: 400, message: 'No se proporcionaron campos para actualizar' });
        }
    } catch (err) {
        next(err);
    }
};

// Eliminar un usuario
exports.deleteUser = (req, res, next) => {
    const { id } = req.params;

    User.remove(id, (err, result) => {
        if (err) return next(err);

        if (result.affectedRows === 0) {
            return next({ status: 404, message: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario eliminado con éxito' });
    });
};

// Login de usuario
exports.loginUser = (req, res, next) => {
    const { mail, contraseña } = req.body;

    User.findByEmail(mail, (err, results) => {
        if (err) return next(err);
        if (results.length === 0) return next({ status: 401, message: 'Credenciales inválidas' });

        const user = results[0];

        const isMatch = bcrypt.compareSync(contraseña, user.contraseña);
        if (!isMatch) return next({ status: 401, message: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: user.id, email: user.mail },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ mensaje: 'Login exitoso', token, usuario: user });
    });
};