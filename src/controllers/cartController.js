const db = require('../config/database');

// Agregar un producto al carrito
async function agregarProdCarrito (req, res) {
    const { usuario_id, producto_id, cantidad } = req.body;

    pool.query('INSERT INTO Carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)', [usuario_id, producto_id, cantidad], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar producto al carrito' });
        } else {
            res.status(201).json({ message: 'Producto agregado al carrito exitosamente' });
        }
    });
};

// Eliminar un producto del carrito
async function eliminarProdCarrito (req, res) {
    const carritoId = req.params.id;

    pool.query('DELETE FROM Carrito WHERE id = ?', carritoId, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar producto del carrito' });
        } else {
            res.json({ message: 'Producto eliminado del carrito exitosamente' });
        }
    });
};

// Actualizar la cantidad de un producto en el carrito
async function actualizarCantProdCarrito (req, res) {
    const carritoId = req.params.id;
    const { cantidad } = req.body;

    pool.query('UPDATE Carrito SET cantidad = ? WHERE id = ?', [cantidad, carritoId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar cantidad del producto en el carrito' });
        } else {
            res.json({ message: 'Cantidad del producto en el carrito actualizada exitosamente' });
        }
    });
};

module.exports = {
    agregarProdCarrito,
    eliminarProdCarrito,
    actualizarCantProdCarrito
};