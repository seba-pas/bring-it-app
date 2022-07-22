const { Category } = require ('../db');
const axios = require ('axios');

async function addCategory (category){
    
    try {
        console.log("en addCategory")
        const newCategory = await Category.create ({...category});
    } catch (error) {
        throw new error (`No se puedo agregar la categoría a la base de datos, ${error.message}`);
    }
}

async function getCategory (){
    try {
        const foundCategories = await Category.findAll({});       
        return foundCategories;        
    } catch (error) {
        throw new Error (`No se encontraron categorías cargadas en la base de datos, ${error}`);
    }     
}

module.exports = {
    addCategory,
    getCategory
};