const db = require ('../config/database');


//Crear categoria #
async function crearCategoria(req,res)  {
    const nuevaCategoria = req.body.nombre;
    try {
        const categoriaExistente= 'SELECT nombre FROM Categorias WHERE nombre=?';
        const [consulta]=await db.promise().query(categoriaExistente,[nuevaCategoria]);
        if(consulta.length>0){
            return res.status(400).json({msg : "La categoria ya existe!!!"});

        }
        if (!nuevaCategoria || nuevaCategoria.trim() === '') {
            return res.status(400).json({ msg: "El nombre de la categoría es obligatorio" });
        }
        //insertar la categoria
        const insertarCategoria = 'INSERT INTO categorias (nombre) VALUE (?)';
        const [categoria]= await db.promise().query(insertarCategoria,[nuevaCategoria]);

        res.json({msg: "Categoria ingresada con exito",id: categoria.innsertId});
        } catch (error) {
            console.error('Error al registrar la categoria:', error);
            res.status(500).json({msg:'Error al registrar la categoria'});
        
        }     
};

//Obtener todas la scategorias #
async function todasLasCategorias(req,res)  {
    try {
        const categoriasExistentes = 'SELECT COUNT(*) AS count FROM Categorias';
        const [resultado] = await db.promise().query(categoriasExistentes);
        const categoriasCount = resultado[0].count;

        if (categoriasCount === 0) {
            return res.status(400).json({ msg: "No hay categorías creadas" });
        }
        const TodosLosProductos = 'SELECT * FROM categorias';
        const [categorias]= await db.promise().query(TodosLosProductos);
        res.json(categorias)
        
    } catch (error) {
        console.error(error);
        res.stauts(500).json({msg: 'Error al obtener todas las categorias'});
    }
   
};

//Obtener categoria por ID #
async function obtenerCategoriaPorID(req,res)  {
   
   try {
    
    const categoria = req.params.id;
    const categoriaId = 'SELECT * FROM Categorias WHERE id = ?';
    const [consulta]= await db.promise().query(categoriaId,[categoria]);
    
    if (consulta.length === 0) {
        return res.status(404).json({ msg: 'La categoría no existe' });
    }

    res.json(consulta[0]);
     
   } catch (error) {
    console.error('error al obtener la categoria',error);
    res.status(500).json({msg: 'Error al obtener la categoria'});  
   }  
}

//Modificar categoria #
async function modificarCategoria(req,res) {
    const categoriaid=req.params.id;
    const {nombre}=req.body;
    try {
        //Consultar si la categoria existe
        const categoriaExistente= 'SELECT * FROM Categorias WHERE id=?';
        const [consulta]=await db.promise().query(categoriaExistente,[categoriaid]);
        if(consulta.length===0){
            return res.status(400).json({msg : "La categoria no existe!!!"});
        }
        
        //Modificar Categoria
        const nuevoNombre= 'UPDATE Categorias SET nombre=? WHERE id=?';
        await db.promise().query(nuevoNombre,[nombre, categoriaid]);
        res.json({msg: 'Categoria modificada con Exito'})
    } catch (error) {
        console.error('error al modificar la categoria',error);
        res.status(404).json('Error al modificar la categoria');
    }
    
}

//Eliminar categoria #
async function eliminarCategoria(req,res) {
    const categoriaId= req.params.id
    try {
        
        //Verificar si la categoria existe
        const categoriaExistente= 'SELECT * FROM Categorias WHERE id=?';
        const [consulta]=await db.promise().query(categoriaExistente,[categoriaId]);
        if(consulta.length===0){
            return res.status(400).json({msg : "La categoria no existe!!!"});
        }
        // Eliminar el categoria
        const eliminaCategoria = 'DELETE FROM categorias WHERE id = ?';
        await db.promise().query(eliminaCategoria, [categoriaId]);
        res.status(200).json("Categotia eliminada")
    } catch (error) {
        console.error('Error al eliminar la categoria',error);
        res.status(500).json({msg:'Error al eliminar la categoria'});
    }
    
}

module.exports={
    crearCategoria,
    todasLasCategorias,
    obtenerCategoriaPorID,
    modificarCategoria,
    eliminarCategoria
}