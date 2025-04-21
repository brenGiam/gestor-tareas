const { body, validationResult } = require('express-validator');

const validateTask = [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('categoria')
        .default('otro')
        .isIn(['personal', 'trabajo', 'estudio', 'otro'])
        .withMessage('Categoría inválida'),
    body('estado').custom(value => {
        if (value) {
            value = value.toLowerCase();
        }
        return ['to do', 'in progress', 'in review', 'completed'].includes(value);
    })
        .withMessage('Estado inválido'),

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
