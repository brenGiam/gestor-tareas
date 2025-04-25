const errorHandler = (err, req, res, next) => {
    // Registrar el error de manera más segura
    console.error('Error:', err.stack || err.message || err);

    if (err.details) {
        return res.status(err.status || 400).json({
            mensaje: err.message,
            errores: err.details
        });
    }

    res.status(err.status || 500).json({
        mensaje: err.message || 'Algo salió mal en el servidor'
    });
};

module.exports = errorHandler;
