const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Crear una Orden nueva 
async function crearOrden(req, res) {
  const { usuario_id, total, estado, fecha_pedido, detalles } = req.body;

  try {
      // Inserta en la tabla Ordenes
      const consultaOrden = 'INSERT INTO Ordenes (usuario_id, total, estado, fecha_pedido) VALUES (?, ?, ?, ?)';
      const [resultadoOrden] = await db.promise().query(consultaOrden, [usuario_id, total, estado, fecha_pedido]);

      const orden_id = resultadoOrden.insertId;

      // Inserta en la tabla OrdenDetalles
      for (let detalle of detalles) {
          const { producto_id, cantidad, precio } = detalle;
          const consultaDetalle = 'INSERT INTO OrdenDetalles (orden_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)';
          await db.promise().query(consultaDetalle, [orden_id, producto_id, cantidad, precio]);
      }

      res.status(201).json({ msg: 'Orden y detalles creados correctamente', id: orden_id });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al crear la orden y los detalles' });
  }
}

// Devuelve órdenes creadas con detalles
async function ordenesCreadas(req, res) {
  try {
      const consulta = `
          SELECT o.id as orden_id, o.usuario_id, o.total, o.estado, o.fecha_pedido, 
                 od.producto_id, od.cantidad, od.precio 
          FROM Ordenes o
          LEFT JOIN OrdenDetalles od ON o.id = od.orden_id
      `;
      const [filas] = await db.promise().query(consulta);

      // Reestructurar los datos para agrupar los detalles por orden
      const ordenesMap = new Map();

      filas.forEach(fila => {
          const {
              orden_id, usuario_id, total, estado, fecha_pedido,
              producto_id, cantidad, precio
          } = fila;

          if (!ordenesMap.has(orden_id)) {
              ordenesMap.set(orden_id, {
                  orden_id,
                  usuario_id,
                  total,
                  estado,
                  fecha_pedido,
                  detalles: []
              });
          }

          ordenesMap.get(orden_id).detalles.push({
              producto_id,
              cantidad,
              precio
          });
      });

      const ordenes = Array.from(ordenesMap.values());

      res.json(ordenes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al obtener las órdenes con detalles' });
  }
}

//Devuelve una orden buscada por ID
async function ordenId(req, res) {
  const id = req.params.id;

  try {
      const consulta = `
          SELECT o.id as orden_id, o.usuario_id, o.total, o.estado, o.fecha_pedido, 
                 od.producto_id, od.cantidad, od.precio 
          FROM Ordenes o
          LEFT JOIN OrdenDetalles od ON o.id = od.orden_id
          WHERE o.id = ?
      `;
      const [filas] = await db.promise().query(consulta, [id]);

      if (filas.length === 0) {
          return res.status(404).json({ msg: 'Orden no encontrada' });
      }

      // Reestructura los datos para incluir los detalles de la orden
      const orden = {
          orden_id: filas[0].orden_id,
          usuario_id: filas[0].usuario_id,
          total: filas[0].total,
          estado: filas[0].estado,
          fecha_pedido: filas[0].fecha_pedido,
          detalles: []
      };

      filas.forEach(fila => {
          orden.detalles.push({
              producto_id: fila.producto_id,
              cantidad: fila.cantidad,
              precio: fila.precio
          });
      });

      res.json(orden);
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al obtener la orden con detalles' });
  }
}

// Actualiza una orden por ID y sus detalles
async function actualizarOrdenId(req, res) {
  const id = req.params.id;
  const { usuario_id, total, estado, detalles } = req.body;

  const connection = db.promise();

  try {
      await connection.beginTransaction();

      const consultaOrden = `
          UPDATE Ordenes 
          SET usuario_id = ?, total = ?, estado = ? 
          WHERE id = ?
      `;
      await connection.query(consultaOrden, [usuario_id, total, estado, id]);

      const consultaBorrarDetalles = `
          DELETE FROM OrdenDetalles 
          WHERE orden_id = ?
      `;
      await connection.query(consultaBorrarDetalles, [id]);

      const consultaInsertarDetalles = `
          INSERT INTO OrdenDetalles (orden_id, producto_id, cantidad, precio) 
          VALUES ?
      `;
      const valoresDetalles = detalles.map(detalle => [id, detalle.producto_id, detalle.cantidad, detalle.precio]);
      await connection.query(consultaInsertarDetalles, [valoresDetalles]);

      await connection.commit();

      res.json({ msg: 'Orden y detalles actualizados correctamente' });
  } catch (error) {
      await connection.rollback();
      console.error(error);
      res.status(500).json({ msg: 'Error al actualizar la orden y sus detalles' });
  }
}

// Elimina una orden por ID y sus detalles asociados
async function eliminarOrdenId(req, res) {
  const id = req.params.id;

  const connection = db.promise();

  try {
      await connection.beginTransaction();

      const consultaBorrarDetalles = `
          DELETE FROM OrdenDetalles 
          WHERE orden_id = ?
      `;
      await connection.query(consultaBorrarDetalles, [id]);

      const consultaBorrarOrden = `
          DELETE FROM Ordenes 
          WHERE id = ?
      `;
      await connection.query(consultaBorrarOrden, [id]);

      await connection.commit();

      res.json({ msg: 'Orden y sus detalles eliminados correctamente' });
  } catch (error) {
      await connection.rollback();
      console.error(error);
      res.status(500).json({ msg: 'Error al eliminar la orden y sus detalles' });
  }
}

module.exports = {
  crearOrden,
  ordenesCreadas,
  ordenId,
  actualizarOrdenId, 
  eliminarOrdenId,
  };