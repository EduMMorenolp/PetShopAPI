const express = require('express');
const router = express.Router();
const { registrarProducto, todosLosProductos, modificarProducto, buscarProductoPorID, eliminarProducto } = require('../controllers/productController')
const { isAdmin, verificarToken } = require('../middleware/authMiddleware');

// Rutas  productos 

//Crear Producto
router.post('/admin/producto', registrarProducto);
// falta agregar verificarToken,isAdmin

//Solicitar todos los productos
router.get('/productos', todosLosProductos);

//Solicitar un producto por ID
router.get('/producto/:id', buscarProductoPorID);

//Modificar un producto
router.put('/admin/producto/:id', modificarProducto);
// falta agregar verificarToken,isAdmin

//Borrar un producto
router.delete('/admin/producto/:id', eliminarProducto);
// falta agregar verificarToken,isAdmin

module.exports = router;
