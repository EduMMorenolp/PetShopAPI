const express = require('express');
const homeRouter = require('./routes/home.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const morgan = require('morgan');


const app = express()
const PORT = process.env.PORT || 3000

// Middleware para entender los json
app.use(express.json())
// Morgan para registrar todas las solicitudes HTTP
app.use(morgan('dev'));

// Ruta home
app.use('/', homeRouter)
// Rutas de usuario
app.use('/user', userRoutes);
//Ruta de ordenes
app.use('/order', orderRoutes);


app.listen(PORT, () => {
    console.log('\n==================================================')
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
    console.log('==================================================\n')
})