const { Product, Business, Category } = require ('../db');
const axios = require ('axios');
const { Op } = require('sequelize');

//Funcion del GET Product detail 
async function getProductById (id){
    try {
        const foundProduct = await Product.findByPk (id, {
            include: [{model: Business}, {model: Category}]
        });      
        return foundProduct;  
    } catch (error) {
        return "No se encontró el producto solicitado";
    }
}

//Funcion del POST Product (es necesario q existan categorias y business cargadas)
async function addProduct (product){
    console.log(product);
    const categoryId = product.categoryId; //viene del front. Es un arreglo de ids de category, arreglo de enteros        
    try {        
        const newProduct = await Product.create ({...product});
        console.log(`en el try despues del create`);       
        await newProduct.addCategory (categoryId);        
    } catch (error) {
        throw new error (`No se puedo agregar el producto a la base de datos, ${error}`);
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
            include: [{model: Business}, {model: Category}]
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
            }
        });
        return foundProductsName;
    } catch (error) {
        throw new Error (`No se encontraron productos con el nombre ${name}, ${error}`);
    }

}



module.exports = {
    getProductById,
    addProduct,
    getProducts
};