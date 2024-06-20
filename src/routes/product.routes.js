const express = require('express');
const router = express.Router();
const {registrarProducto,todosLosProductos,modificarProducto,buscarProductoPorID,eliminarProducto }= require('../controllers/productController')
const { isAdmin, verificarToken } = require('../middleware/authMiddleware');

// Rutas  productos 
//Crear Producto
router.post('/producto', registrarProducto);//localhost:3000/producto  --- falta agregar verificarToken,isAdmin

//Solisitar todos los productos
router.get('/productos', todosLosProductos);//localhost:3000/productos   

//Solisitar un producto por ID
router.get('/productos/:id', buscarProductoPorID);//localhost:3000/productos/id

// //Modificar un producto
router.put('/admin/productos/:id',modificarProducto );//localhost:3000/admin/productos/:id  ---falta agregar verificarToken,isAdmin 

// //Borrar un producto
router.delete('/admin/productos/:id', eliminarProducto   );//localhost:3000/admin/productos/id ---falta agregar ,verificarToken,isAdmin---

module.exports = router;