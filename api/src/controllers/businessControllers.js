const { Business, Businessbranch } = require ('../db');
const { Op } = require('sequelize');

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
            include: {model: Businessbranch}
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
            include: {model: Businessbranch}
        }, 

        );
        return foundBusinessName;
    } catch (error) {
        throw new Error (`No se encontraron empresas con el nombre ${name}, ${error}`);
    }

}

// Funcion del GET / GET BUSINESS BY EMAIL
async function getBusinessByEmail (email){
    try {
        const businessByEmail = await Business.findByPk (email, {
            include: {model: Businessbranch}
        });      
        return businessByEmail;  
    }catch(e){
        return "No se encontró la empresa solicitada";
    }
}

//GET  a todos ls emails de business
async function getAllEmail(){
    try {
        const allEmail= await Business.findAll({
            attributes: ['email']
        })
        console.log(allEmail);
        return allEmail;
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getBusiness,
    getAllEmail,
    getBusinessByEmail
}