const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const db = require('../config/database');
require('dotenv').config();

// Middleware para verificar el token JWT
async function verificarToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Obtener la conexión existente desde el módulo de base de datos
    const connection = db.promise();

    // Consulta para obtener el usuario por su ID
    const consultaUsuario = 'SELECT * FROM usuarios WHERE id = ?';
    const [rows] = await connection.execute(consultaUsuario, [decoded.usuario.id]);

    // Verificar si se encontró el usuario
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Asignar el usuario al objeto de solicitud
    req.usuario = rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Token no válido' });
  }
}

const isAdmin = (req, res, next) => {
  // Verificar si el usuario está autenticado y tiene el rol de administrador
  if (req.usuario && req.usuario.rol === 'admin') {
    return next(); 
  } else {
    return res.status(403).json({ message: 'Acceso no autorizado' });
  }
};

module.exports = { verificarToken, isAdmin };
