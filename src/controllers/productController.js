const db = require ('../config/database');

//Registrar producto
async function registrarProducto(req, res) {
    // const { nombre, descripcion, precio, peso, img, unidadDeMedida, idCategoria } = req.body;
    // try {
    //     // Verificar si el producto existe
    //     const consultaProductoExistente = 'SELECT * FROM productos WHERE nombre = ? AND peso = ?';
    //     const [productos] = await db.promise().query(consultaProductoExistente, [nombre, peso]);

    //     if (productos.length > 0) {
    //         return res.status(400).json({ msg: 'El Producto Ya Existe' });
    //     }

    //     // Insertar nuevo Producto
    //     const insertarProducto = 'INSERT INTO productos (nombre, img, descripcion, precio, peso, u_medida, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?)';
    //     const [resultado] = await db.promise().query(insertarProducto, [nombre, img, descripcion, precio, peso, unidadDeMedida, idCategoria]);

    //     res.json({ msg: 'Producto registrado correctamente', id: resultado.insertId });
    // } catch (error) {
    //     console.error('Error al registrar el producto:', error);
    //     res.status(500).json({ msg: 'Error al registrar el producto' });
    // }
    res.status(200).json("Productos cargados")
};
//Consultar todos los productos
async function todosLosProductos(req,res){
    res.status(200).json("Todos los productos")
};

//Consultar producto por ID
async function buscarProductoPorID(req,res){
    res.status(200).json("Producto por ID")
};

//Modificar producto
async function modificarProducto(req, res) {
    res.status(200).json("Producto modificado")
}

//Eliminar producto
async function eliminarProducto(req,res){
    res.status(200).json("Producto eliminado")
}

module.exports = {
    registrarProducto,
    todosLosProductos,
    modificarProducto,
    eliminarProducto,
    buscarProductoPorID,
};


    