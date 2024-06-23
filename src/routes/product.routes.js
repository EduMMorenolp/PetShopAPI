const express = require('express');
const router = express.Router();
const {registrarProducto,todosLosProductos,modificarProducto,buscarProductoPorID,eliminarProducto }= require('../controllers/productController')
const { isAdmin, verificarToken } = require('../middleware/authMiddleware');

// Rutas  productos 
//Crear Producto
router.post('/admin/producto', registrarProducto);//localhost:3000/producto  --- falta agregar verificarToken,isAdmin

//Solicitar todos los productos
router.get('/productos', todosLosProductos);//localhost:3000/productos   

//Solicitar un producto por ID
router.get('/producto/:id', buscarProductoPorID);//localhost:3000/productos/id

// //Modificar un producto
router.put('/admin/producto/:id',modificarProducto );//localhost:3000/admin/productos/:id  ---falta agregar verificarToken,isAdmin 

// //Borrar un producto
router.delete('/admin/producto/:id', eliminarProducto   );//localhost:3000/admin/productos/id ---falta agregar ,verificarToken,isAdmin---

module.exports = router;
