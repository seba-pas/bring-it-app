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

module.exports = {
    addCategory
};