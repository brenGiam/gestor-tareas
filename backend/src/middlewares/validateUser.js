const { body, validationResult } = require('express-validator');

const validateUser = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),

    body('apellido')
        .notEmpty()
        .withMessage('El apellido es obligatorio'),

    body('mail')
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Debe ser un email válido'),

    body('contraseña')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    // Middleware que verifica si hubo errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Errores de validación');
            error.status = 400;
            error.details = errors.array();
            return next(error);
        }
        next();
    }
];

module.exports = validateUser;