const db = require ('../config/database');

//Registrar producto
async function registrarProducto(req, res) {
    
     const { nombre, descripcion, precio, peso,  u_medida, categoria_id } = req.body;
    try {
        // Verificar si el producto existe
        const consultaProductoExistente = 'SELECT * FROM productos WHERE nombre = ? AND peso = ?';
        const [producto] = await db.promise().query(consultaProductoExistente, [nombre, peso]);
        if (producto.length > 0) {
            return res.status(400).json({ msg: 'El Producto Ya Existe' });
        }
        // Insertar nuevo Producto
        const insertarProducto = 'INSERT INTO productos (nombre, descripcion, precio, peso,  u_medida, categoria_id) VALUES (?, ?, ?, ?, ?, ?)';
        const [resultado] = await db.promise().query(insertarProducto, [nombre, descripcion, precio, peso,  u_medida, categoria_id]);

        res.json({ msg: 'Producto registrado correctamente', id: resultado.insertId });
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            res.status(500).json({ msg: 'Error al registrar el producto' });
        }
    
};
//Consultar todos los productos
async function todosLosProductos(req,res){
    try {
        const todosLosProductos = 'SELECT * From productos'
        const [productos]= await db.promise().query(todosLosProductos);
        res.json(productos)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los productos'});
        
    }
    
};

//Consultar producto por ID
async function buscarProductoPorID(req,res){
    try {
        const productoId = req.params.id;
        const consulta = 'SELECT * FROM productos WHERE id = ?';
        const [producto]= await db.promise().query(consulta,[productoId]);

        if (producto.length === 0) {
            res.status(404).json({msg: 'Producto no encontrado'});
        } else {
            res.json(producto[0]);
        }
    }

     catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error al obtener el producto'});
    }
    
    
};

//Modificar producto
async function modificarProducto(req, res) {
    const ProductoId= req.params.id;
    const {nombre, descripcion , precio , peso , u_medida }= req.body;
   
    try {
        //Verificar si el producto existe
         const consultarProductoId = 'SELECT * FROM productos WHERE id = ? ';
         const [producto]= await db.promise().query(consultarProductoId, [ProductoId]);
         
        
        if(producto.length === 0){
            return res.status(404).json({ msg: 'Producto no encontrado'});
        }
        //Actualizar producto
        const actualizarProducto = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, peso = ?, u_medida = ? WHERE id = ?';
        await db.promise().query(actualizarProducto, [nombre, descripcion , precio , peso , u_medida ,  ProductoId]);
        res.json({msg: 'Producto actualizado correctamente'});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error al actualizar producto'})
    }   
}
 
//Eliminar producto
async function eliminarProducto(req,res){
    const productoId = req.params.id;
    try{
     // Verificar si el producto existe
     const consultaProducto = 'SELECT * FROM productos WHERE id = ?';
     const [producto] = await db.promise().query(consultaProducto, [productoId]);

     if (producto.length === 0) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
    }

     // Eliminar el producto
     const eliminaProducto = 'DELETE FROM productos WHERE id = ?';
    await db.promise().query(eliminaProducto, [productoId]);

     res.json({ msg: 'Producto eliminado correctamente' });
 } catch (error) {
     console.error(error);
     res.status(500).json({ msg: 'Error al eliminar producto' });
    }
    
}

module.exports = {
    registrarProducto,
    todosLosProductos,
    modificarProducto,
    eliminarProducto,
    buscarProductoPorID,
};


    