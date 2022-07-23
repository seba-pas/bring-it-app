const { Business, Product, City } = require ('../db');
const axios = require ('axios');
const { Op } = require('sequelize');


//Funcion del POST Business, agrega empresa a la bd
async function addBusiness (business){
    const {email, password, businessName, cuit, taxBracket, logo, province, address, cityId} = business;     
    
    try {
        const newBusiness = await Business.create ({email, password, businessName, cuit, taxBracket, logo, province, address, cityId});        
        
    } catch (error) {
        throw new error (`No se puedo agregar la empresa a la base de datos, ${error.message}`);
    }
}


//Fucion del GET Business, redirecciona segun haya query name o no 
function getBusiness (name){
    if (name){
        return getBusinessByName (name);
    }
    else{
        return getAllBusiness ();
    }
}

//Funcion interna, es llamada por getBusiness cuando no viene query name
async function getAllBusiness (){
    try {
        const foundBusinessComplete = await Business.findAll({
            include: [{model: Product}, {model: City}]
        });       
        return foundBusinessComplete;        
    } catch (error) {
        throw new Error (`No se encontraron empresas cargadas en la base de datos, ${error}`);
    }     
}

//Funcion interna, es llamada por getBusiness cuando viene query name
async function getBusinessByName (name){    
    try {
        const foundBusinessName = await Business.findAll({
            where: {
                businessName: {                    
                    [Op.iLike]: `%${name}%`,
                }
            },            
            include: [{model: Product}, {model: City}]
        }, 

        );
        return foundBusinessName;
    } catch (error) {
        throw new Error (`No se encontraron empresas con el nombre ${name}, ${error}`);
    }

}

module.exports = {
    addBusiness,
    getBusiness
};