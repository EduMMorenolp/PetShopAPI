// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registroUsuario, loginUsuario, obtenerTodosUsuarios, obtenerUsuarioPorId, actualizarUsuario, borrarUsuario } = require('../controllers/userController');

// Ruta para registrar un nuevo usuario
router.post('/registro', registroUsuario);

// Ruta para iniciar sesión y obtener un token
router.post('/login', loginUsuario);

// Rutas que requieren rol de administrador
router.get('/admin/usuarios', obtenerTodosUsuarios); 
router.get('/admin/usuarios/:id', obtenerUsuarioPorId); 
router.put('/admin/usuarios/:id', actualizarUsuario); 
router.delete('/admin/usuarios/:id', borrarUsuario); 

module.exports = router;
