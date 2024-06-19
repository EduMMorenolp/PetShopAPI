const express = require('express')
const homeRouter = require('./routes/home.routes')
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
const morgan = require('morgan');

const app = express()
const PORT = process.env.PORT || 3000

// Middleware para entender los json
app.use(express.json())
// Morgan para registrar todas las solicitudes HTTP
app.use(morgan('dev'));
// Cors para permitir solicitudes desde cualquier origen
app.use(cors());
// Para manejar las solicitudes OPTIONS
app.options('*', cors());

// Ruta home
app.use('/', homeRouter)
// Rutas de usuario
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log('\n==================================================')
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
    console.log('==================================================\n')
})