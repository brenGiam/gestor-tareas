const { body, validationResult } = require('express-validator');

const validateTask = [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('categoria').isIn(['personal', 'trabajo', 'estudio', 'otro']).withMessage('Categoria inválida'),
    body('estado').isIn(['to do', 'in progress', 'in review', 'completed']).withMessage('Estado inválido'),

    // Middleware que verifica si hubo errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next();
    }
];

module.exports = validateTask;
