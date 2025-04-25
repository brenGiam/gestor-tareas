const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        const error = new Error('Token no proporcionado');
        error.status = 401;
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        let errorMessage = 'Token inválido';
        let statusCode = 401;

        if (err.name === 'TokenExpiredError') {
            errorMessage = 'Token expirado';
        }

        const error = new Error(errorMessage);
        error.status = statusCode;
        return next(error);
    }
};

module.exports = authMiddleware;