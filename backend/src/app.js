const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares globales
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Rutas de tareas con prefijo /api/tasks
app.use('/api/tasks', taskRoutes);

// Rutas de usuarios con prefijo /api/users
app.use('/api/users', userRoutes);

// Middleware de error personalizado
app.use(errorHandler);

// Middleware 404 - Página no encontrada
app.use((req, res) => {
    res.status(404).send('<h1>404 - Página no encontrada</h1><p>La página que buscas no existe.</p>');
});


module.exports = app;