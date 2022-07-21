const { Business } = require ('../db');
const axios = require ('axios');

async function addBusiness (business){
    const {email, password, businessName, cuit, taxBracket, logo, province, address, CityId} = business;     
    
    try {
        const newBusiness = await Business.create ({email, password, businessName, cuit, taxBracket, logo, province, address, CityId});        
        
    } catch (error) {
        throw new error (`No se puedo agregar la empresa a la base de datos, ${error.message}`);
    }
}


module.exports = {
    addBusiness
};