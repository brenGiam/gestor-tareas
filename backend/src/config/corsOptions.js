const allowedOrigins = [
    'http://localhost:3000', // para desarrollo
    'https://tudominio.com'  // direccion del frontend cuando haga el despliegue.
];

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir sin origen (por ejemplo en Postman) o si está en la lista
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No autorizado por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // si vas a usar cookies o headers personalizados
};

module.exports = corsOptions;