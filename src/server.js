const express = require('express')
const homeRouter = require('./routes/home.routes')
const userRoutes = require('./routes/user.routes');

const app = express()
const PORT = process.env.PORT || 3000

// Middleware para entender los json
app.use(express.json())

// Ruta home
app.use('/', homeRouter)
// Rutas de usuario
app.use('/usuarios', userRoutes);

app.listen(PORT, () => {
    console.log('\n==================================================')
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
    console.log('==================================================\n')
})