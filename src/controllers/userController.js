// controllers/userController.js
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
async function registroUsuario(req, res) {
  const { nombre, email, contraseña } = req.body;

  try {
    // Verificar si el usuario ya existe
    const consultaUsuarioExistente = 'SELECT * FROM usuarios WHERE email = ?';
    const [usuarios] = await db.promise().query(consultaUsuarioExistente, [email]);

    if (usuarios.length > 0) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    // Insertar nuevo usuario
    const consultaInsertarUsuario = 'INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)';
    const [resultado] = await db.promise().query(consultaInsertarUsuario, [nombre, email, contraseñaHash]);

    res.json({ msg: 'Usuario registrado correctamente', id: resultado.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar el usuario' });
  }
}
// Función para iniciar sesión y obtener un token JWT
async function loginUsuario(req, res) {
  const { email, contraseña } = req.body;

  try {
    // Verificar si el usuario existe
    const consultaUsuario = 'SELECT * FROM usuarios WHERE email = ?';
    const [usuarios] = await db.promise().query(consultaUsuario, [email]);

    if (usuarios.length === 0) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(contraseña, usuarios[0].contraseña);
    if (!contraseñaValida) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    // Crear y firmar el token JWT
    const payload = {
      usuario: {
        id: usuarios[0].id,
        email: usuarios[0].email,
        rol: usuarios[0].rol // Asumiendo que tienes un campo rol en tu tabla usuarios
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
}
// Función para obtener todos los usuarios (requiere rol de administrador)
async function obtenerTodosUsuarios(req, res) {
  try {
    const consultaTodosUsuarios = 'SELECT id, nombre, email, rol FROM usuarios';
    const [usuarios] = await db.promise().query(consultaTodosUsuarios);
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los usuarios' });
  }
}
// Función para obtener un usuario por ID (requiere rol de administrador)
async function obtenerUsuarioPorId(req, res) {
  const usuarioId = req.params.id;

  try {
    const consultaUsuarioPorId = 'SELECT id, nombre, email, rol FROM usuarios WHERE id = ?';
    const [usuarios] = await db.promise().query(consultaUsuarioPorId, [usuarioId]);

    if (usuarios.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(usuarios[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el usuario' });
  }
}
// Función para actualizar un usuario por ID (requiere rol de administrador)
async function actualizarUsuario(req, res) {
  const usuarioId = req.params.id;
  const { nombre, email, rol } = req.body;

  try {
    // Verificar si el usuario existe
    const consultaUsuarioPorId = 'SELECT * FROM usuarios WHERE id = ?';
    const [usuarios] = await db.promise().query(consultaUsuarioPorId, [usuarioId]);

    if (usuarios.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Actualizar usuario
    const consultaActualizarUsuario = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?';
    await db.promise().query(consultaActualizarUsuario, [nombre, email, rol, usuarioId]);

    res.json({ msg: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el usuario' });
  }
}
// Función para borrar un usuario por ID (requiere rol de administrador)
async function borrarUsuario(req, res) {
  const usuarioId = req.params.id;

  try {
    // Verificar si el usuario existe
    const consultaUsuarioPorId = 'SELECT * FROM usuarios WHERE id = ?';
    const [usuarios] = await db.promise().query(consultaUsuarioPorId, [usuarioId]);

    if (usuarios.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Borrar usuario
    const consultaBorrarUsuario = 'DELETE FROM usuarios WHERE id = ?';
    await db.promise().query(consultaBorrarUsuario, [usuarioId]);

    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el usuario' });
  }
}

module.exports = {
  registroUsuario,
  loginUsuario,
  obtenerTodosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  borrarUsuario
};
