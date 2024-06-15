// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

// Middleware para verificar el token JWT
async function verificarToken(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = await User.findByPk(decoded.usuario.id);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Token no válido' });
  }
}

const isAdmin = (req, res, next) => {
  // Verificar si el usuario está autenticado y tiene el rol de administrador
  if (req.user && req.user.rol === 'admin') {
    return next(); 
  } else {
    return res.status(403).json({ message: 'Acceso no autorizado' });
  }
};

module.exports = { verificarToken, isAdmin };