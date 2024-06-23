const db = require ('../config/database');


async function crearCategoria(req,res)  {
    res.status(200).json("Categoria Creada")
};
async function todasLasCategorias(req,res)  {
    res.status(200).json("Todas las categorias")
};
async function obtenerCategoriaPorID(req,res)  {
    res.status(200).json("Categoria por ID obtenida")
}
async function modificarCategoria(req,res) {
    res.status(200).json("Categoria modificada")
}
async function eliminarCategoria(req,res) {
    res.status(200).json("Categotia eliminada")
}

module.exports={
    crearCategoria,
    todasLasCategorias,
    obtenerCategoriaPorID,
    modificarCategoria,
    eliminarCategoria
}