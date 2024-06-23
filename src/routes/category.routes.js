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
router.post('/admin/categoria', crearCategoria);
// falta agregar isAdmin y verificarToken 

//Modificar categoria
router.put('/admin/categoria/:id', modificarCategoria);
// falta agregar isAdmin y verificarToken 

//Eliminar categoria
router.delete('/admin/categoria/:id', eliminarCategoria);
// falta agregar isAdmin y verificarToken 

module.exports = router
