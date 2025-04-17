const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(logger);

// Ruta principal
app.get('/', (req, res) => {
    res.send('<h1>¡Bienvenido a la página principal!</h1><p>Esta es la página de inicio de nuestro servidor.</p>');
});

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