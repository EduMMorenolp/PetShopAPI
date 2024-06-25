const express = require('express');
const router = express.Router();
const { registroUsuario, loginUsuario, obtenerTodosUsuarios, obtenerUsuarioPorId, actualizarUsuario, borrarUsuario } = require('../controllers/userController');
const { isAdmin, verificarToken } = require('../middleware/authMiddleware');

// Ruta para registrar un nuevo usuario
router.post('/registro', registroUsuario);

// Ruta para iniciar sesión y obtener un token
router.post('/login', loginUsuario);

// Rutas que requieren rol de administrador
router.get('/admin/usuarios', verificarToken, isAdmin, obtenerTodosUsuarios);
router.get('/admin/usuarios/:id', verificarToken, isAdmin, obtenerUsuarioPorId);
router.put('/admin/usuarios/:id', verificarToken, isAdmin, actualizarUsuario);
router.delete('/admin/usuarios/:id', verificarToken, isAdmin, borrarUsuario);


module.exports = router;
