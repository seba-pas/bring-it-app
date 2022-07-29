const { Product, Business, Category, Businessbranch } = require ('../db');
const axios = require ('axios');
const { Op } = require('sequelize');

//Funcion del GET Product detail 
async function getProductById (id){
    try {
        const foundProduct = await Product.findByPk (id, {
            include: [{model: Businessbranch}, {model: Category}]
        });      
        return foundProduct;  
    } catch (error) {
        return "No se encontró el producto solicitado";
    }
}

//Fucion del GET Products, redirecciona segun haya query name o no 
function getProducts (name){
    if (name){
        return getProductsByName (name);
    }
    else{
        return getAllProducts ();
    }
}

//Funcion interna, es llamada por getProducts cuando no viene query name
async function getAllProducts (){
    try {
        const foundProductsComplete = await Product.findAll({
            include: [{model: Businessbranch}, {model: Category}]
        });       
        return foundProductsComplete;        
    } catch (error) {
        throw new Error (`No se encontraron productos cargados en la base de datos, ${error}`);
    }     
}

//Funcion interna, es llamada por getProducts cuando viene query name
async function getProductsByName (name){    
    try {
        const foundProductsName = await Product.findAll({
            where: {
                name: {                    
                    [Op.iLike]: `%${name}%`,
                }
            },
            include: [{model: Businessbranch}, {model: Category}]
        });        
        if (foundProductsName.length) {
            return foundProductsName
        } else {
            return "No se encontraron productos asociados"
        }
    } catch (error) {
        throw new Error (`No se encontraron productos con el nombre ${name}, ${error}`);
    }

}


module.exports = {
    getProductById,
    getProducts
};