const express = require('express');
const homeRouter = require('./routes/home.routes');
const userRoutes = require('./routes/user.routes');
const productosRouter = require('./routes/product.routes');
const categoriaRouter = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes');
const cors = require('cors');

const morgan = require('morgan');


const app = express()
const PORT = process.env.PORT || 3000

// Middleware para entender los json
app.use(express.json())
// Morgan para registrar todas las solicitudes HTTP
app.use(morgan('dev'));
// Implementacion de Cors
const allowedOrigins = [
    'https://edummorenolp.github.io',
    // Otros orígenes permitidos según sea necesario
];

app.use(cors({
    origin: function (origin, callback) {
        // Permite las peticiones sin origen (como curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'El origen no está permitido por la política CORS';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Ruta home
app.use('/', homeRouter)
// Rutas de usuario
app.use('/user', userRoutes);

//Ruta de Productos
app.use('/', productosRouter);

app.use('/', categoriaRouter)

//Ruta de Ordenes
app.use('/order', orderRoutes);


app.listen(PORT, () => {
    console.log('\n==================================================')
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
    console.log('==================================================\n')
})
