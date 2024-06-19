const express = require('express');
const router = express.Router();
const {registrarProducto}= require('../controllers/productController')
const { isAdmin, verificarToken } = require('../middleware/authMiddleware');

// Rutas  productos 
//Crear Producto
router.post('/admin/productos', verificarToken, isAdmin, registrarProducto);

// //Solisitar todos los productos
// router.get('/productos', todosLosProductos);

// //Solisitar un producto por ID
// router.get('/productos/:id', buscarProductoPorID);

// //Modificar un producto
// router.put('/admin/productos/:id',verificarToken,isAdmin,modificarProducto );

// //Borrar un producto
// router.delete('/admin/producto/:id',verificarToken,isAdmin, eliminarProducto   );

module.exports = router;