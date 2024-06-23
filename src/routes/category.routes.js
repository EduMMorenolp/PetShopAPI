const express = require('express');
const router = express.Router();
const { crearCategoria, todasLasCategorias, obtenerCategoriaPorID, modificarCategoria, eliminarCategoria } = require('../controllers/categoryController')
const { isAdmin, verificarToken } = require('../middleware/authMiddleware');


// Rutas  Categorías

//Crear una nueva categoria
router.post('/admin/categorias', crearCategoria,);
// falta agregar isAdmin, verificarToken

//Obtener todas las categorias
router.get('/categorias', todasLasCategorias);

//Obtener categoria por ID
router.get('/categoria/:id', obtenerCategoriaPorID);//localhost:3000/categorias/id

//Modificar categoria
router.put('/admin/categoria/:id',modificarCategoria); //localhost:3000/admin/categoria ----falta agregar isAdmin, verificarToken

//Eliminar categoria
router.delete('/admin/categoria/:id', eliminarCategoria);
// falta agregar isAdmin, verificarToken

module.exports = router
