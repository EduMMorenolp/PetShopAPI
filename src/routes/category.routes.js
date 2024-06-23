const express = require('express');
const router = express.Router();
const { crearCategoria, todasLasCategorias, obtenerCategoriaPorID, modificarCategoria, eliminarCategoria } = require('../controllers/categoryController')
const { isAdmin, verificarToken } = require('../middleware/authMiddleware');


// Rutas  Categorías
//Obtener todas las categorias
router.get('/categorias', todasLasCategorias);

//Obtener categoria por ID
router.get('/categoria/:id', obtenerCategoriaPorID);

//Crear una nueva categoria
router.post('/admin/categoria', verificarToken, crearCategoria,);
// falta agregar isAdmin

//Modificar categoria
router.put('/admin/categoria/:id', verificarToken, modificarCategoria);
// falta agregar isAdmin

//Eliminar categoria
router.delete('/admin/categoria/:id', verificarToken, eliminarCategoria);
// falta agregar isAdmin

module.exports = router
