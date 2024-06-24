const express = require('express');
const router = express.Router();
const { agregarProdCarrito, eliminarProdCarrito, actualizarCantProdCarrito } = require('../controllers/cartController');
const { isAdmin, verificarToken } = require('../middleware/authMiddleware');

//Agregar al Carrito
router.post('/carrito/agregar/:idProducto', verificarToken, agregarProdCarrito);

//Modificar cantidad de producto en carrito
router.put('/carrito/actualizar/:idProducto', verificarToken, actualizarCantProdCarrito);

//Borrar un producto del carrito
router.delete('/carrito/eliminar/:idProducto', verificarToken, eliminarProdCarrito);

module.exports = router;