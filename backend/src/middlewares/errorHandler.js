const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ mensaje: 'Algo salió mal en el servidor' });
};

module.exports = errorHandler;

//Para capturar errores de forma centralizada y enviar una respuesta más clara si algo falla.