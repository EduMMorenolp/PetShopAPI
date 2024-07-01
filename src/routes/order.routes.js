//POST /ordenes/crear - Crear una nueva orden de compra.
//GET /ordenes - Obtener todas las órdenes de compra.
//GET /ordenes/:id - Obtener una orden de compra por ID.
//PUT /ordenes/actualizar/:id - Actualizar una orden de compra por ID.
//DELETE /ordenes/eliminar/:id - Eliminar una orden de compra por ID.

const express = require('express');
const router = express.Router();
const { crearOrden, ordenesCreadas, ordenId, actualizarOrdenId, eliminarOrdenId} = require('../controllers/orderController');



router.post('/nuevaOrden', crearOrden);

router.get('/', ordenesCreadas);

router.get('/:id', ordenId);

router.put('/actualizar/:id', actualizarOrdenId);

router.delete('/eliminar/:id', eliminarOrdenId);


module.exports = router;