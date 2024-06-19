const express = require('express')
const homeRouter = require('./routes/home.routes')
const productosRouter = require('./routes/product.routes')
const categoriaRouter = require('./routes/category.routes')
const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())


// Ruta home
app.use('/', homeRouter)

//Ruta de Productos
app.use('/productos', productosRouter)

//Ruta de categoria
app.use('./categoria', categoriaRouter)

app.listen(PORT, () => {
    console.log('\n==================================================')
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
    console.log('==================================================\n')
})