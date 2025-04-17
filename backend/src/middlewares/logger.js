const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = logger;

//Para registrar en consola cada request que se hace (método y ruta).