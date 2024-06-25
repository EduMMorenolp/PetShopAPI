//POST /ordenes/crear - Crear una nueva orden de compra.
//GET /ordenes - Obtener todas las órdenes de compra.
//GET /ordenes/:id - Obtener una orden de compra por ID.
//PUT /ordenes/actualizar/:id - Actualizar una orden de compra por ID.
//DELETE /ordenes/eliminar/:id - Eliminar una orden de compra por ID.

const express = require('express');
const router = express.Router();
const { crearOrden, ordenesCreadas, ordenId, actualizarOrdenId, eliminarOrdenId} = require('../controllers/orderController');


// router.get('/prueba', (req, res) =>{
//     console.log("Se ha ejecutado el endpoint '/prueba'");
//     res.send("Hola mundo");

// })

router.post('/nuevaOrden', crearOrden);

router.get('/', ordenesCreadas);

router.get('/:id', ordenId);

router.get('/actualizar:id', actualizarOrdenId);

router.get('/eliminar/:id', eliminarOrdenId);


module.exports = router;