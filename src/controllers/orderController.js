// controllers/orderController.js
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Crea una Orden nueva
async function crearOrden(req, res) {
    const { usuario_id, total, estado, fecha_pedido } = req.body;
  
    try {
      const consulta = 'INSERT INTO ordenes (usuario_id, total, estado, fecha_pedido) VALUES (?, ?, ?, ?)';
      const [resultado] = await db.promise().query(consulta, [usuario_id, total, estado, fecha_pedido]);
  
      res.status(201).json({ msg: 'Orden creada correctamente', id: resultado.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al crear la orden' });
    }
  }

//Devuelve ordenes creadas
 async function ordenesCreadas(req, res) {
    try {
      const consulta = 'SELECT * FROM ordenes';
      const [ordenes] = await db.promise().query(consulta);
      console.log(ordenes);

      res.json(ordenes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al obtener las órdenes' });
    }
  } 

//Devuelve una orden buscada por ID
async function ordenId(req, res) {
    const id = req.params.id;

    try {
      const consulta = 'SELECT * FROM ordenes WHERE id = ?';
      const [orden] = await db.promise().query(consulta, [id]);

      if (orden.length === 0) {
        return res.status(404).json({ msg: 'Orden no encontrada' });

      }

      res.json(orden[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al obtener la orden' });
    }
  }

 //actualiza una orden por ID 
async function actualizarOrdenId(req, res) {
    const id = req.params.id;
    const { usuario_id, fecha, total, estado } = req.body;

    try {
      const consulta = 'UPDATE ordenes SET usuario_id = ?, fecha = ?, total = ?, estado = ? WHERE id = ?';
      await db.promise().query(consulta, [usuario_id, fecha, total, estado, id]);

      res.json({ msg: 'Orden actualizada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al actualizar la orden' });
    }
  } 

 //Elimina una orden por ID 
async function eliminarOrdenId(req, res) {
    const id = req.params.id;

    try {
      const consulta = 'DELETE FROM ordenes WHERE id = ?';
      await db.promise().query(consulta, [id]);

      res.json({ msg: 'Orden eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al eliminar la orden' });
    }
  }

module.exports = {
  crearOrden,
  ordenesCreadas,
  ordenId,
  actualizarOrdenId, 
  eliminarOrdenId,
  };