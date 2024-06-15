const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

// Función para generar un token JWT
const generateJWT = (user) => {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      rol: user.rol
    }
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Puedes ajustar el tiempo de expiración según tus necesidades
};

module.exports = { generateJWT };