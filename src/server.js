const express = require('express')
const homeRouter = require('./routes/home.routes')
const userRoutes = require('./routes/user.routes');
const productosRouter =require('./routes/product.routes');
const categoriaRouter =require('./routes/category.routes')
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

//------Productos

//Ruta de Productos
app.use('/productos', productosRouter);

//Ruta de producto por ID
app.use('/productos/:id', productosRouter);

//Ruta Modificar producto
app.use('/admin/productos/:id', productosRouter);

//Ruta para eliminar un producto
app.use('/admin/producto/:id',productosRouter);


//------Categorías
//Routa crear categoria
app.use('/admin/categorias',categoriaRouter)

//Ruta consultar todas las categorias
app.use('/categorias',categoriaRouter)

//Ruta Consultar categoria por ID
app.use('/categoria/:id',categoriaRouter)

//Ruta actualisar categoria
app.use('/admin/categoria/id',categoriaRouter)

//Ruta Eliminar categoria
app.use ('/admin/categoria/:id',categoriaRouter)

app.listen(PORT, () => {
    console.log('\n==================================================')
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
    console.log('==================================================\n')
})